import { ChartItem, ChartsByCategoryResponse } from 'utility/ChartsApi/types';
import {
  CrosswordCandidate,
  CrosswordCell,
  CrosswordDirection,
  CrosswordPlacement,
  CrosswordPuzzle,
} from './types';

const MIN_ANSWER_LENGTH = 4;
const MAX_ANSWER_LENGTH = 12;
const GRID_SIZE = 17;
const TARGET_WORDS = 10;
const MAX_CANDIDATES = 42;

type MutableCell = CrosswordCell;
type RawPlacement = Omit<CrosswordPlacement, 'id' | 'number' | 'row' | 'col'> & {
  row: number;
  col: number;
};

export const normalizeAnswer = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

const hashSeed = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const seededRandom = (seed: number) => {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffled = <T,>(items: T[], random: () => number) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const next = Math.floor(random() * (index + 1));
    [result[index], result[next]] = [result[next], result[index]];
  }
  return result;
};

const countCredits = (value: string) =>
  value.split(/\s*,\s*|\s*&\s*|\s+and\s+|\s+feat\.?\s+|\s+ft\.?\s+|\s+with\s+/i)
    .map((credit) => credit.trim())
    .filter(Boolean).length;

const getClue = (item: ChartItem, kind: 'song' | 'artist' | 'producer', value: string) => {
  if (kind === 'song') {
    return `Song at No. ${item.rank}, performed by ${item.artiste}.`;
  }
  if (kind === 'artist') {
    const credits = countCredits(value);
    const noun = credits === 1 ? 'artiste' : 'artistes';
    return `${credits} ${noun} credited on “${item.title}” at No. ${item.rank}.`;
  }
  const credits = countCredits(value);
  const noun = credits === 1 ? 'producer' : 'producers';
  return `${credits} ${noun} credited on “${item.title}” at No. ${item.rank}.`;
};

export const buildCandidates = (chart: ChartsByCategoryResponse): CrosswordCandidate[] => {
  const candidates = new Map<string, CrosswordCandidate>();
  const add = (
    item: ChartItem,
    value: string,
    kind: 'song' | 'artist' | 'producer',
  ) => {
    const answer = normalizeAnswer(value);
    if (answer.length < MIN_ANSWER_LENGTH || answer.length > MAX_ANSWER_LENGTH) return;

    const candidate: CrosswordCandidate = {
      key: `${kind}:${answer}`,
      answer,
      displayAnswer: value.trim(),
      kind,
      clue: getClue(item, kind, value),
      rank: item.rank,
    };

    if (!candidates.has(candidate.key)) candidates.set(candidate.key, candidate);
  };

  [...chart.chartItems]
    .sort((a, b) => a.rank - b.rank)
    .forEach((item) => {
      add(item, item.title, 'song');
      add(item, item.artiste, 'artist');
      const producers = item.producedBy
        ? item.producedBy.split(/,|\s(?:&|and)\s/gi)
        : [];
      producers.forEach((producer) => add(item, producer, 'producer'));
    });

  return Array.from(candidates.values())
    .sort((a, b) => {
      const scoreA = a.rank * 2 + a.answer.length + (a.kind === 'producer' ? 8 : 0);
      const scoreB = b.rank * 2 + b.answer.length + (b.kind === 'producer' ? 8 : 0);
      return scoreA - scoreB;
    })
    .slice(0, MAX_CANDIDATES);
};

const cellKey = (row: number, col: number) => `${row}:${col}`;

const createEmptyCells = () => new Map<string, MutableCell>();

const letterCoordinates = (answer: string, row: number, col: number, direction: CrosswordDirection) =>
  Array.from(answer).map((letter, offset) => ({
    letter,
    row: row + (direction === 'down' ? offset : 0),
    col: col + (direction === 'across' ? offset : 0),
  }));

const canPlace = (candidate: CrosswordCandidate, row: number, col: number, direction: CrosswordDirection, cells: Map<string, MutableCell>, mustIntersect = true) => {
  const coordinates = letterCoordinates(candidate.answer, row, col, direction);
  if (coordinates.some(({ row: letterRow, col: letterCol }) => letterRow < 0 || letterCol < 0 || letterRow >= GRID_SIZE || letterCol >= GRID_SIZE)) {
    return false;
  }

  const beforeRow = row - (direction === 'down' ? 1 : 0);
  const beforeCol = col - (direction === 'across' ? 1 : 0);
  const afterOffset = candidate.answer.length;
  const afterRow = row + (direction === 'down' ? afterOffset : 0);
  const afterCol = col + (direction === 'across' ? afterOffset : 0);
  if (cells.has(cellKey(beforeRow, beforeCol)) || cells.has(cellKey(afterRow, afterCol))) return false;

  let intersections = 0;
  for (const { letter, row: letterRow, col: letterCol } of coordinates) {
    const existing = cells.get(cellKey(letterRow, letterCol));
    if (existing) {
      if (existing.answer !== letter) return false;
      intersections += 1;
      continue;
    }

    const adjacent = direction === 'across'
      ? [cellKey(letterRow - 1, letterCol), cellKey(letterRow + 1, letterCol)]
      : [cellKey(letterRow, letterCol - 1), cellKey(letterRow, letterCol + 1)];
    if (adjacent.some((key) => cells.has(key))) return false;
  }

  return !mustIntersect || intersections > 0;
};

const place = (placement: RawPlacement, cells: Map<string, MutableCell>, placementId: number) => {
  letterCoordinates(placement.answer, placement.row, placement.col, placement.direction).forEach(({ letter, row, col }, index) => {
    const key = cellKey(row, col);
    const existing = cells.get(key);
    if (existing) {
      existing.placementIds.push(placementId);
      return;
    }
    cells.set(key, {
      row,
      col,
      answer: letter,
      placementIds: [placementId],
      number: index === 0 ? placementId : undefined,
    });
  });
};

const growLayout = (candidates: CrosswordCandidate[], random: () => number) => {
  const cells = createEmptyCells();
  const placements: CrosswordPlacement[] = [];
  const remaining = shuffled(candidates, random);
  if (remaining.length === 0) return { cells, placements };

  const first = remaining.shift()!;
  const startRow = Math.floor(GRID_SIZE / 2);
  const startCol = Math.floor((GRID_SIZE - first.answer.length) / 2);
  const firstPlacement: CrosswordPlacement = {
    ...first,
    id: 1,
    number: 1,
    row: startRow,
    col: startCol,
    direction: 'across',
  };
  placements.push(firstPlacement);
  place(firstPlacement, cells, 1);

  let attempts = 0;
  while (placements.length < TARGET_WORDS && attempts < 100 && remaining.length > 0) {
    attempts += 1;
    let added = false;
    const candidatesInOrder = shuffled(remaining, random);

    for (const candidate of candidatesInOrder) {
      const possible: RawPlacement[] = [];
      for (const existing of placements) {
        for (let newIndex = 0; newIndex < candidate.answer.length; newIndex += 1) {
          for (let existingIndex = 0; existingIndex < existing.answer.length; existingIndex += 1) {
            if (candidate.answer[newIndex] !== existing.answer[existingIndex]) continue;
            const direction: CrosswordDirection = existing.direction === 'across' ? 'down' : 'across';
            const crossingRow = existing.row + (existing.direction === 'down' ? existingIndex : 0);
            const crossingCol = existing.col + (existing.direction === 'across' ? existingIndex : 0);
            const row = crossingRow - (direction === 'down' ? newIndex : 0);
            const col = crossingCol - (direction === 'across' ? newIndex : 0);
            if (canPlace(candidate, row, col, direction, cells)) {
              possible.push({ ...candidate, row, col, direction });
            }
          }
        }
      }

      if (possible.length === 0) continue;
      const selected = possible[Math.floor(random() * possible.length)];
      const id = placements.length + 1;
      const placement: CrosswordPlacement = { ...selected, id, number: id };
      placements.push(placement);
      place(placement, cells, id);
      remaining.splice(remaining.findIndex((item) => item.key === candidate.key), 1);
      added = true;
      break;
    }

    if (!added) break;
  }

  return { cells, placements };
};

const trimGrid = (cells: Map<string, MutableCell>, placements: CrosswordPlacement[]) => {
  const cellValues = Array.from(cells.values());
  if (cellValues.length === 0) return { rows: GRID_SIZE, cols: GRID_SIZE, cells };
  const minRow = Math.min(...cellValues.map((cell) => cell.row));
  const maxRow = Math.max(...cellValues.map((cell) => cell.row));
  const minCol = Math.min(...cellValues.map((cell) => cell.col));
  const maxCol = Math.max(...cellValues.map((cell) => cell.col));
  const trimmedCells = new Map<string, MutableCell>();

  cellValues.forEach((cell) => {
    const row = cell.row - minRow;
    const col = cell.col - minCol;
    trimmedCells.set(cellKey(row, col), { ...cell, row, col });
  });
  placements.forEach((placement) => {
    placement.row -= minRow;
    placement.col -= minCol;
  });

  return {
    rows: maxRow - minRow + 1,
    cols: maxCol - minCol + 1,
    cells: trimmedCells,
  };
};

export const generateCrossword = (chart: ChartsByCategoryResponse): CrosswordPuzzle | null => {
  const candidates = buildCandidates(chart);
  if (candidates.length < 5) return null;

  const puzzleId = `v2-${chart.chartCategoryId}-${chart.id}-${chart.weekNumber}-${new Date(chart.dateCreated).toISOString().slice(0, 10)}`;
  const random = seededRandom(hashSeed(puzzleId));
  let best: ReturnType<typeof growLayout> | null = null;
  let bestScore = -1;

  for (let attempt = 0; attempt < 35; attempt += 1) {
    const prioritized = candidates.sort((a, b) => {
      if (attempt === 0 && a.rank !== b.rank) return a.rank - b.rank;
      return b.answer.length - a.answer.length;
    });
    const layout = growLayout(prioritized, random);
    const score = layout.placements.length * 100 + layout.cells.size - (layout.placements.length < 5 ? 1000 : 0);
    if (score > bestScore) {
      bestScore = score;
      best = layout;
    }
  }

  if (!best || best.placements.length < 5) return null;
  const trimmed = trimGrid(best.cells, best.placements);
  const sortedPlacements = [...best.placements].sort((a, b) => a.row - b.row || a.col - b.col);
  const numberByPosition = new Map<string, number>();
  sortedPlacements.forEach((placement) => {
    const position = cellKey(placement.row, placement.col);
    if (!numberByPosition.has(position)) numberByPosition.set(position, numberByPosition.size + 1);
  });
  sortedPlacements.forEach((placement) => {
    placement.number = numberByPosition.get(cellKey(placement.row, placement.col))!;
  });

  const cells: Record<string, CrosswordCell> = {};
  trimmed.cells.forEach((cell, key) => {
    cells[key] = {
      row: cell.row,
      col: cell.col,
      answer: cell.answer,
      placementIds: [],
    };
  });
  sortedPlacements.forEach((placement) => {
    letterCoordinates(placement.answer, placement.row, placement.col, placement.direction).forEach(({ row, col }, index) => {
      const cell = cells[cellKey(row, col)];
      if (!cell) return;
      if (index === 0) cell.number = placement.number;
      cell.placementIds.push(placement.id);
    });
  });

  return {
    id: puzzleId,
    title: 'The Chart Crossword',
    chartName: chart.category,
    chartCategoryId: chart.chartCategoryId,
    chartId: chart.id,
    weekLabel: chart.week,
    generatedAt: chart.dateCreated,
    rows: trimmed.rows,
    cols: trimmed.cols,
    placements: sortedPlacements,
    cells,
  };
};
