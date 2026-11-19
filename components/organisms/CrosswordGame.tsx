/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';
import {
  CrosswordCell,
  CrosswordDirection,
  CrosswordPlacement,
  CrosswordPuzzle,
} from 'utility/Crossword/types';

type Props = { puzzle: CrosswordPuzzle };
type Position = { row: number; col: number };
type StoredProgress = {
  answers: Record<string, string>;
  elapsed: number;
  completedAt?: number;
};

const positionKey = (row: number, col: number) => `${row}:${col}`;
const coordinatesFor = (placement: CrosswordPlacement): Position[] =>
  Array.from(placement.answer).map((_, index) => ({
    row: placement.row + (placement.direction === 'down' ? index : 0),
    col: placement.col + (placement.direction === 'across' ? index : 0),
  }));

const ordinal = (day: number) => {
  const suffix = day % 100 >= 11 && day % 100 <= 13
    ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] || 'th';
  return `${day}${suffix}`;
};

const formatChartWeek = (dateValue: string) => {
  const end = new Date(dateValue.slice(0, 10) + 'T12:00:00');
  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  const month = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });
  return `${month(start)} ${ordinal(start.getDate())} – ${month(end)} ${ordinal(end.getDate())}, ${end.getFullYear()}`;
};

const CrosswordGame: React.FC<Props> = ({ puzzle }) => {
  const maxReveals = Math.floor(Object.keys(puzzle.cells).length / 2);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState(puzzle.placements[0]?.id ?? 0);
  const [selectedDirection, setSelectedDirection] = useState<CrosswordDirection>(puzzle.placements[0]?.direction ?? 'across');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    puzzle.placements[0] ? { row: puzzle.placements[0].row, col: puzzle.placements[0].col } : null,
  );
  const [checkedCells, setCheckedCells] = useState<Set<string>>(new Set());
  const [revealsRemaining, setRevealsRemaining] = useState(maxReveals);
  const [elapsed, setElapsed] = useState(0);
  const [completedAt, setCompletedAt] = useState<number>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreCardImage, setScoreCardImage] = useState<string | null>(null);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [notice, setNotice] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const scoreCardRef = useRef<HTMLDivElement | null>(null);
  const storageKey = `ttc-crossword-progress:${puzzle.id}`;
  const revealStorageKey = `ttc-crossword-reveals-v2:${puzzle.id}`;

  const selectedPlacement = useMemo(
    () => puzzle.placements.find((placement) => placement.id === selectedId) ?? puzzle.placements[0],
    [puzzle.placements, selectedId],
  );
  const selectedCoordinates = useMemo(
    () => (selectedPlacement ? coordinatesFor(selectedPlacement) : []),
    [selectedPlacement],
  );
  const selectedKeys = useMemo(
    () => new Set(selectedCoordinates.map(({ row, col }) => positionKey(row, col))),
    [selectedCoordinates],
  );
  const totalLetters = Object.keys(puzzle.cells).length;
  const filledLetters = Object.keys(puzzle.cells).filter((key) => Boolean(answers[key])).length;
  const correctLetters = Object.entries(puzzle.cells).filter(([key, cell]) => answers[key] === cell.answer).length;
  const correctWords = puzzle.placements.filter((placement) =>
    coordinatesFor(placement).every(({ row, col }, index) =>
      answers[positionKey(row, col)] === placement.answer[index],
    ),
  ).length;
  const isComplete = filledLetters === totalLetters && Object.entries(puzzle.cells).every(([key, cell]) => answers[key] === cell.answer);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredProgress;
        setAnswers(parsed.answers ?? {});
        setElapsed(parsed.elapsed ?? 0);
        setCompletedAt(parsed.completedAt);
      }
      const storedReveals = window.localStorage.getItem(revealStorageKey);
      if (storedReveals !== null) {
        const remaining = Number(storedReveals);
        if (Number.isInteger(remaining)) {
          setRevealsRemaining(Math.max(0, Math.min(maxReveals, remaining)));
        }
      }
    } catch {
      window.localStorage.removeItem(storageKey);
      window.localStorage.removeItem(revealStorageKey);
    }
    setHydrated(true);
  }, [maxReveals, revealStorageKey, storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(revealStorageKey, String(revealsRemaining));
  }, [hydrated, revealStorageKey, revealsRemaining]);

  useEffect(() => {
    if (!hydrated || completedAt || isSubmitted) return undefined;
    const timer = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, [completedAt, hydrated, isSubmitted]);

  useEffect(() => {
    if (isComplete && !completedAt) {
      setCompletedAt(Date.now());
      setNotice('Crossword complete. You cleared the charts.');
    }
  }, [completedAt, isComplete]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const focusPosition = (position: Position) => {
    setSelectedPosition(position);
    window.requestAnimationFrame(() => inputRefs.current[positionKey(position.row, position.col)]?.focus());
  };

  const chooseCell = (cell: CrosswordCell) => {
    const isSameCell = selectedPosition?.row === cell.row && selectedPosition?.col === cell.col;
    const choices = cell.placementIds
      .map((id) => puzzle.placements.find((placement) => placement.id === id))
      .filter((placement): placement is CrosswordPlacement => Boolean(placement));
    const current = choices.find((placement) => placement.id === selectedId);
    const next = isSameCell && choices.length > 1
      ? choices.find((placement) => placement.direction !== selectedDirection) ?? choices[0]
      : current ?? choices.find((placement) => placement.direction === selectedDirection) ?? choices[0];
    if (!next) return;
    setSelectedId(next.id);
    setSelectedDirection(next.direction);
    focusPosition({ row: cell.row, col: cell.col });
  };

  const choosePlacement = (placement: CrosswordPlacement, scrollToGrid = false) => {
    setSelectedId(placement.id);
    setSelectedDirection(placement.direction);
    focusPosition({ row: placement.row, col: placement.col });
    if (scrollToGrid && window.innerWidth <= 700) {
      document.getElementById('crossword-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const moveWithinWord = (step: number) => {
    if (!selectedPosition || !selectedPlacement) return;
    const index = selectedCoordinates.findIndex(
      (position) => position.row === selectedPosition.row && position.col === selectedPosition.col,
    );
    const nextIndex = Math.max(0, Math.min(selectedCoordinates.length - 1, index + step));
    focusPosition(selectedCoordinates[nextIndex]);
  };

  const setCellValue = (position: Position, value: string) => {
    const cleanValue = value.toUpperCase().replace(/[^A-Z]/g, '').slice(-1);
    const key = positionKey(position.row, position.col);
    setAnswers((current) => ({ ...current, [key]: cleanValue }));
    setCheckedCells((current) => {
      const next = new Set(current);
      next.delete(key);
      return next;
    });
    if (cleanValue) moveWithinWord(1);
  };

  const checkPuzzle = () => {
    const checked = new Set<string>();
    Object.entries(puzzle.cells).forEach(([key, cell]) => {
      if (answers[key] && answers[key] !== cell.answer) checked.add(key);
    });
    setCheckedCells(checked);
    setNotice(checked.size ? `${checked.size} letter${checked.size === 1 ? '' : 's'} need another look.` : 'Everything entered is correct.');
  };

  const revealLetter = () => {
    if (!selectedPosition || completedAt || isSubmitted || revealsRemaining <= 0) return;
    const key = positionKey(selectedPosition.row, selectedPosition.col);
    const cell = puzzle.cells[key];
    if (!cell) return;
    setAnswers((current) => ({ ...current, [key]: cell.answer }));
    setRevealsRemaining((remaining) => Math.max(0, remaining - 1));
    setCheckedCells(new Set());
    moveWithinWord(1);
  };

  const clearPuzzle = () => {
    if (!window.confirm('Clear all letters and restart this puzzle?')) return;
    setAnswers({});
    setCheckedCells(new Set());
    setElapsed(0);
    setCompletedAt(undefined);
    setIsSubmitted(false);
    setScoreCardImage(null);
    setRevealsRemaining(maxReveals);
    if (puzzle.placements[0]) choosePlacement(puzzle.placements[0]);
  };

  const submitPuzzle = async () => {
    if (isSubmitted || isGeneratingCard) return;
    setIsSubmitted(true);
    setIsGeneratingCard(true);
    try {
      await document.fonts?.ready;
      const cardElement = scoreCardRef.current;
      if (!cardElement) throw new Error('Score card is not ready.');
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      setScoreCardImage(canvas.toDataURL('image/png'));
    } catch (error) {
      setIsSubmitted(false);
      setNotice('Could not create the score card. Please try again.');
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const downloadScoreCard = () => {
    if (!scoreCardImage) return;
    const link = document.createElement('a');
    link.href = scoreCardImage;
    link.download = `turntable-crossword-${puzzle.id}.png`;
    link.click();
  };

  const shareScoreCard = async () => {
    if (!scoreCardImage) return;
    try {
      const response = await fetch(scoreCardImage);
      const imageBlob = await response.blob();
      const imageFile = new File([imageBlob], 'turntable-crossword-score.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [imageFile] })) {
        await navigator.share({ files: [imageFile], title: 'The Chart Crossword', text: 'My TurnTable Chart Crossword score' });
      } else {
        await navigator.clipboard.writeText(`I scored ${correctWords}/${puzzle.placements.length} on The Chart Crossword. ${window.location.href}`);
        setNotice('Score link copied. Download the image to share your card.');
      }
    } catch {
      setNotice('Sharing was cancelled or unavailable. You can still download the image.');
    }
  };

  const shareResult = async () => {
    const minutes = Math.floor(elapsed / 60);
    const seconds = String(elapsed % 60).padStart(2, '0');
    const text = `I cleared The Chart Crossword in ${minutes}:${seconds}. ${puzzle.placements.length} answers from ${puzzle.chartName}.`;
    try {
      if (navigator.share) await navigator.share({ title: 'The Chart Crossword', text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        setNotice('Result copied to your clipboard.');
      }
    } catch {
      // User cancelled the share sheet.
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, position: Position) => {
    const offsets: Record<string, Position> = {
      ArrowUp: { row: -1, col: 0 },
      ArrowDown: { row: 1, col: 0 },
      ArrowLeft: { row: 0, col: -1 },
      ArrowRight: { row: 0, col: 1 },
    };
    if (event.key === 'Backspace' && !answers[positionKey(position.row, position.col)]) {
      event.preventDefault();
      moveWithinWord(-1);
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      const cell = puzzle.cells[positionKey(position.row, position.col)];
      if (cell) chooseCell(cell);
    }
    const offset = offsets[event.key];
    if (!offset) return;
    event.preventDefault();
    let row = position.row + offset.row;
    let col = position.col + offset.col;
    while (row >= 0 && col >= 0 && row < puzzle.rows && col < puzzle.cols) {
      if (puzzle.cells[positionKey(row, col)]) {
        focusPosition({ row, col });
        break;
      }
      row += offset.row;
      col += offset.col;
    }
  };

  const minutes = Math.floor(elapsed / 60);
  const seconds = String(elapsed % 60).padStart(2, '0');
  const across = puzzle.placements.filter((placement) => placement.direction === 'across');
  const down = puzzle.placements.filter((placement) => placement.direction === 'down');
  const chartWeek = formatChartWeek(puzzle.generatedAt);

  return (
    <Page>
      <Header>
        <h1>The Chart Crossword</h1>
        <p>Songs, artistes and producers from this week’s charts.</p>
        <MetaLine aria-label="Puzzle details">
          <span>{puzzle.chartName}</span>
          <i>·</i>
          <span>{chartWeek}</span>
          <i>·</i>
          <span>{puzzle.placements.length} answers</span>
          <i>·</i>
          <span>{minutes}:{seconds}</span>
        </MetaLine>
      </Header>
      <Workspace>
        <PuzzlePoster id="crossword-grid">
          {selectedPlacement && (
            <SelectedClue aria-live="polite">
              <span>{selectedPlacement.number}</span>
              <b>{selectedPlacement.direction}</b>
              <p>{selectedPlacement.clue}</p>
            </SelectedClue>
          )}
          <GridShell>
            <Grid
              $cols={puzzle.cols}
              $rows={puzzle.rows}
              role="grid"
              aria-label="Chart crossword puzzle"
            >
              {Array.from({ length: puzzle.rows * puzzle.cols }, (_, index) => {
                const row = Math.floor(index / puzzle.cols);
                const col = index % puzzle.cols;
                const key = positionKey(row, col);
                const cell = puzzle.cells[key];
                if (!cell) return <BlockedCell key={key} role="presentation" />;
                const isSelected = selectedPosition?.row === row && selectedPosition?.col === col;
                const isIncorrect = checkedCells.has(key);
                return (
                  <LetterCell
                    key={key}
                    className={`${selectedKeys.has(key) ? 'in-word' : ''} ${isSelected ? 'selected' : ''} ${isIncorrect ? 'incorrect' : ''} ${answers[key] ? 'filled' : ''}`}
                    onClick={() => chooseCell(cell)}
                    role="gridcell"
                    aria-selected={isSelected}
                    aria-invalid={isIncorrect || undefined}
                  >
                    {cell.number && <CellNumber>{cell.number}</CellNumber>}
                    <input
                      ref={(element) => { inputRefs.current[key] = element; }}
                      value={answers[key] ?? ''}
                      onChange={(event) => setCellValue({ row, col }, event.target.value)}
                      onFocus={() => {
                        setSelectedPosition({ row, col });
                        const placement = cell.placementIds
                          .map((id) => puzzle.placements.find((item) => item.id === id))
                          .find((item) => item?.direction === selectedDirection && item) as CrosswordPlacement | undefined;
                        if (placement) setSelectedId(placement.id);
                      }}
                      onKeyDown={(event) => handleKeyDown(event, { row, col })}
                      aria-label={`Row ${row + 1}, column ${col + 1}${cell.number ? `, clue ${cell.number}` : ''}${isIncorrect ? ', marked incorrect' : ''}`}
                      inputMode="text"
                      autoCapitalize="characters"
                      autoComplete="off"
                      spellCheck={false}
                      maxLength={1}
                      disabled={Boolean(completedAt) || isSubmitted}
                    />
                  </LetterCell>
                );
              })}
            </Grid>
          </GridShell>
        </PuzzlePoster>
      </Workspace>
      <Toolbar aria-label="Crossword controls">
        <button type="button" onClick={checkPuzzle}>Check</button>
        <button
          type="button"
          onClick={revealLetter}
          disabled={Boolean(completedAt) || isSubmitted || revealsRemaining === 0}
        >
          Reveal letter ({revealsRemaining})
        </button>
        <button type="button" onClick={clearPuzzle}>Clear</button>
        <button type="button" onClick={submitPuzzle} disabled={isSubmitted || isGeneratingCard}>
          {isGeneratingCard ? 'Creating…' : 'Submit'}
        </button>
      </Toolbar>
      <CluesColumn aria-label="Crossword clues">
        <ClueGroup title="Across" items={across} selectedId={selectedId} onSelect={choosePlacement} />
        <ClueGroup title="Down" items={down} selectedId={selectedId} onSelect={choosePlacement} />
      </CluesColumn>
      <ScoreCardCapture ref={scoreCardRef} aria-hidden="true">
        <ScoreCardPaper>
          <ScoreCardMasthead>TurnTable Charts <span>THE WEEKLY MUSIC PUZZLE</span></ScoreCardMasthead>
          <ScoreCardTitle>The Chart<br />Crossword</ScoreCardTitle>
          <ScoreCardSubhead>{puzzle.chartName} · {chartWeek}</ScoreCardSubhead>
          <ScoreCardScore>{correctWords}<small> / {puzzle.placements.length} correct answers</small></ScoreCardScore>
          <ScoreCardTime>Completed in {minutes}:{seconds}</ScoreCardTime>
          <ScoreCardPattern $cols={puzzle.cols} $rows={puzzle.rows}>
            {Array.from({ length: puzzle.rows * puzzle.cols }, (_, index) => {
              const row = Math.floor(index / puzzle.cols);
              const col = index % puzzle.cols;
              const cell = puzzle.cells[positionKey(row, col)];
              if (!cell) return <i key={index} className="blocked" />;
              const value = answers[positionKey(row, col)];
              return <i key={index} className={value === cell.answer ? 'correct' : value ? 'incorrect' : 'empty'} />;
            })}
          </ScoreCardPattern>
          <ScoreCardFooter>PLAY THE CHARTS · TURNTABLECHARTS.COM</ScoreCardFooter>
        </ScoreCardPaper>
      </ScoreCardCapture>
      {scoreCardImage && (
        <ScoreCardOverlay role="dialog" aria-modal="true" aria-label="Your crossword score card">
          <ScoreCardDialog>
            <button type="button" className="close" onClick={() => setScoreCardImage(null)} aria-label="Close score card">×</button>
            <h2>Your score card</h2>
            <img src={scoreCardImage} alt={`Crossword score: ${correctWords} of ${puzzle.placements.length} answers correct in ${minutes}:${seconds}`} />
            <div className="actions">
              <button type="button" onClick={downloadScoreCard}>Download image</button>
              <button type="button" onClick={shareScoreCard}>Share</button>
            </div>
          </ScoreCardDialog>
        </ScoreCardOverlay>
      )}
    </Page>
  );
};

const ClueGroup = ({ title, items, selectedId, onSelect }: {
  title: string;
  items: CrosswordPlacement[];
  selectedId: number;
  onSelect: (placement: CrosswordPlacement, scrollToGrid?: boolean) => void;
}) => (
  <section>
    <ClueHeading>{title}</ClueHeading>
    <ClueList>
      {items.map((placement) => (
        <li key={`${placement.direction}-${placement.id}-${placement.answer}`}>
          <button
            type="button"
            className={placement.id === selectedId ? 'active' : ''}
            onClick={() => onSelect(placement, true)}
            aria-pressed={placement.id === selectedId}
          >
            <span className="number">{placement.number}</span>
            <span className="copy"><strong>{placement.clue}</strong></span>
          </button>
        </li>
      ))}
    </ClueList>
  </section>
);

export default CrosswordGame;

const Page = styled.main`
  min-height: 100vh; padding: 128px 16px 72px; overflow: hidden;
  background: #fff; color: #111; font-family: 'Work Sans', sans-serif;
  ${media.mobileLarge`padding: 102px 10px 48px;`}
`;

const Header = styled.header`
  max-width: 900px;
  margin: 0 auto 38px;
  text-align: center;
  h1 {
    margin: 0;
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(2.6rem, 6.3vw, 5.8rem);
    font-weight: 900;
    line-height: .92;
    letter-spacing: -.055em;
    text-transform: uppercase;
    animation: headerReveal .65s cubic-bezier(.22, 1, .36, 1) both;
  }
  > p {
    margin: 15px auto 18px;
    color: #333;
    font-family: 'Mermaid', 'Nohemi', cursive;
    font-size: clamp(1rem, 2vw, 1.45rem);
    font-weight: 400;
    letter-spacing: .01em;
    line-height: 1.45;
    text-shadow: .35px .2px 0 #333, -.25px 0 rgba(0,0,0,.35);
    animation: handwritingReveal .8s cubic-bezier(.22, 1, .36, 1) .12s both;
  }
  @keyframes handwritingReveal {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes headerReveal {
    
  }
  @media (prefers-reduced-motion: reduce) {
    h1, > p { animation: none; }
  }
`;
const MetaLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #111;
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .08em;
  line-height: 1.5;
  text-transform: uppercase;
  i { color: #c42d1e; font-style: normal; }
  time {
    position: relative;
    min-width: 58px;
    padding: 4px 9px 5px;
    color: #c42d1e;
    font-family: 'Mermaid', 'Nohemi', cursive;
    font-size: .86rem;
    font-weight: 400;
    letter-spacing: .03em;
    font-variant-numeric: tabular-nums;
    transform: rotate(-1.5deg);
  }
  time::before,
  time::after {
    content: '';
    position: absolute;
    inset: -3px -4px -2px;
    border: 1.7px solid #c42d1e;
    border-radius: 48% 52% 46% 54% / 55% 45% 58% 42%;
    transform: rotate(-3deg);
    pointer-events: none;
  }
  time::after {
    inset: -1px -6px -4px -2px;
    border-width: 1px;
    border-radius: 52% 47% 55% 44% / 46% 56% 43% 57%;
    opacity: .65;
    transform: rotate(2deg);
  }
  animation: headerReveal .65s cubic-bezier(.22, 1, .36, 1) .24s both;
  @keyframes headerReveal {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const Workspace = styled.section`
  width: 100%; max-width: 920px; margin: 0 auto; display: flex; align-items: center; justify-content: center;
`;
const PuzzleColumn = styled.div`min-width: 0;`;

const PuzzlePoster = styled.div`
  width: min(88vw, 760px); padding: 0;
  ${media.mobileLarge`width: 100%;`}
`;

const GridShell = styled.div`
  width: 100%; margin: 0; overflow: visible; border: 0; background: transparent;
`;
const Grid = styled.div<{ $cols: number; $rows: number }>`display: grid; grid-template-columns: repeat(${({ $cols }) => $cols}, minmax(0, 1fr)); grid-template-rows: repeat(${({ $rows }) => $rows}, minmax(0, 1fr)); aspect-ratio: ${({ $cols, $rows }) => `${$cols} / ${$rows}`}; background: #111;`;
const BlockedCell = styled.div`background: #fff;`;

const LetterCell = styled.div`
  position: relative; min-width: 0; min-height: 0; background: #fff; border: 0;
  &::before, &::after { content: ''; position: absolute; pointer-events: none; z-index: 0; }
  &::before { inset: -1px; border: 1.7px solid #111; border-radius: 1px 0 2px 1px; transform: rotate(.28deg); }
  &::after { top: 0; right: -1px; bottom: 0; left: 1px; border-right: 1px solid rgba(17,17,17,.72); border-bottom: 1px solid rgba(17,17,17,.7); transform: rotate(-.22deg); }
  &.in-word { background: #fafafa; }
  &.selected { z-index: 2; background: #fff3cc; box-shadow: inset 0 0 0 2px #111; }
  &.incorrect { box-shadow: inset 0 -3px #c42d1e; }
  input { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; border: 0; outline: none; background: transparent; color: #111; caret-color: transparent; font-family: 'Work Sans'; font-size: clamp(.62rem, 2.2vw, 1.45rem); font-weight: 600; text-align: center; text-transform: uppercase; padding: 15% 0 0; cursor: pointer; }
  &.filled input { color: #111; }
  input:disabled { opacity: 1; }
  input:focus-visible { box-shadow: inset 0 0 0 2px #111; }
  ${media.mobileLarge`input { font-size: clamp(.52rem, 4.3vw, .95rem); }`}
`;
const CellNumber = styled.span`position: absolute; z-index: 1; top: 2px; left: 3px; color: #111; font: 700 clamp(.32rem, .7vw, .55rem) 'Work Sans'; line-height: 1; pointer-events: none; ${media.mobileLarge`top: 1px; left: 1px; font-size: .34rem;`}`;

const CurrentClue = styled.div`
  display: flex; align-items: flex-start; gap: 14px; max-width: 760px; min-height: 72px; margin: 0 auto; padding: 13px 8px; border-bottom: 2px solid #111;
  > span { flex: 0 0 38px; color: #c42d1e; font: 900 1rem 'Nohemi'; } small { display: block; margin-bottom: 4px; color: #555; font-size: .5rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; } p { margin: 0; color: #111; font-size: .76rem; font-weight: 600; line-height: 1.4; }
  ${media.tablet`position: sticky; top: 70px; z-index: 20; background: rgba(243,239,231,.97);`}
`;

const Toolbar = styled.div`
  max-width: 760px;
  margin: 14px auto 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  button {
    min-height: 38px;
    padding: 0 14px;
    border: 1px solid #111;
    background: #fff;
    color: #111;
    font: 700 .62rem 'Work Sans', sans-serif;
    letter-spacing: .04em;
    text-transform: uppercase;
    cursor: pointer;
  }
  button:first-child { background: #111; color: #fff; }
  button:hover,
  button:focus-visible { opacity: .65; outline: none; }
  button:disabled { opacity: .35; cursor: not-allowed; }
  ${media.mobileLarge`button { flex: 1; padding: 0 8px; }`}
`;

const ClueHeading = styled.h2`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0 0 12px;
  padding: 0;
  border: 0;
  font: 800 1rem 'Nohemi', sans-serif;
  text-transform: uppercase;
  span { display: none; }
`;
const ClueList = styled.ol`
  list-style: none;
  li { border: 0; }
  button {
    width: 100%;
    display: grid;
    grid-template-columns: 25px 1fr;
    gap: 7px;
    padding: 4px 0;
    border: 0;
    background: transparent;
    color: #111;
    text-align: left;
    cursor: pointer;
  }
  button:hover,
  button:focus-visible,
  button.active {
    background: transparent;
    box-shadow: none;
    outline: none;
  }
  .number { color: #111; font: 700 .72rem 'Work Sans', sans-serif; }
  .copy { display: block; }
  strong { color: #111; font-size: .7rem; font-weight: 500; line-height: 1.4; }
`;

const CluesColumn = styled.aside`
  max-width: 780px;
  margin: 46px auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 42px;
  padding-top: 0;
  border: 0;
  ${media.mobileLarge`grid-template-columns: 1fr; gap: 26px; margin-top: 34px;`}
`;

const SelectedClue = styled.div`
  position: static;
  width: 100%;
  min-height: 34px;
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  gap: 7px;
  padding: 5px 8px;
  margin: 0 0 10px;
  background: #fff;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  backdrop-filter: none;
  outline: 1.5px solid #111;
  outline-offset: -1px;
  transform: rotate(-.12deg);
  span { min-width: 20px; font-size: .68rem; font-weight: 700; }
  b { font-size: .58rem; font-weight: 700; text-transform: uppercase; }
  p { min-width: 0; margin: 0; color: #111; font-size: .68rem; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  ${media.mobileLarge`min-height: 32px; padding: 5px 7px; margin-bottom: 8px; gap: 5px; p { font-size: .62rem; }`}
`;

const ScoreCardCapture = styled.div`
  position: fixed;
  top: 0;
  left: -10000px;
  width: 900px;
  pointer-events: none;
`;

const ScoreCardPaper = styled.div`
  width: 900px;
  min-height: 1120px;
  padding: 76px;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #111;
  font-family: 'Work Sans', sans-serif;
  border: 2px solid #111;
`;

const ScoreCardMasthead = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 3px solid #111;
  font: 800 24px 'Nohemi', sans-serif;
  text-transform: uppercase;
  span { align-self: center; font: 700 13px 'Work Sans', sans-serif; letter-spacing: 2px; }
`;

const ScoreCardTitle = styled.h2`
  margin: 70px 0 24px;
  font: 900 78px/.92 'Nohemi', sans-serif;
  letter-spacing: -3px;
  text-transform: uppercase;
`;

const ScoreCardSubhead = styled.p`
  margin: 0;
  font: 700 18px 'Work Sans', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ScoreCardScore = styled.div`
  margin: 42px 0 8px;
  color: #c42d1e;
  font: 900 118px/.95 'Nohemi', sans-serif;
  small { display: block; margin-top: 12px; color: #111; font: 700 20px 'Work Sans', sans-serif; letter-spacing: 1px; text-transform: uppercase; }
`;

const ScoreCardTime = styled.p`
  margin: 8px 0 44px;
  font: 600 18px 'Work Sans', sans-serif;
`;

const ScoreCardPattern = styled.div<{ $cols: number; $rows: number }>`
  width: 100%;
  max-width: 748px;
  margin: auto 0 38px;
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
  aspect-ratio: ${({ $cols, $rows }) => `${$cols} / ${$rows}`};
  i { display: block; border: 1px solid #111; }
  i.blocked { border-color: transparent; background: transparent; }
  i.correct { background: #c42d1e; }
  i.incorrect { background: #111; }
  i.empty { background: #fff; }
`;

const ScoreCardFooter = styled.div`
  padding-top: 18px;
  border-top: 3px solid #111;
  font: 800 14px 'Work Sans', sans-serif;
  letter-spacing: 2px;
`;

const ScoreCardOverlay = styled.div`
  position: fixed;
  z-index: 1400;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, .68);
`;

const ScoreCardDialog = styled.div`
  position: relative;
  width: min(100%, 520px);
  max-height: min(92vh, 900px);
  overflow: auto;
  padding: 24px;
  background: #fff;
  color: #111;
  border: 1px solid #111;
  .close { position: absolute; top: 10px; right: 12px; border: 0; background: none; color: #111; font-size: 28px; cursor: pointer; }
  h2 { margin: 0 36px 16px 0; font: 800 1.2rem 'Nohemi', sans-serif; text-transform: uppercase; }
  img { display: block; width: min(100%, 360px); max-height: 65vh; margin: 0 auto; object-fit: contain; border: 1px solid #111; }
  .actions { display: flex; justify-content: center; gap: 10px; margin-top: 18px; }
  .actions button { min-height: 42px; padding: 0 16px; border: 1px solid #111; background: #fff; color: #111; font: 700 .68rem 'Work Sans', sans-serif; text-transform: uppercase; cursor: pointer; }
  .actions button:first-child { background: #111; color: #fff; }
  ${media.mobileLarge`padding: 18px; .actions button { flex: 1; padding: 0 8px; }`}
`;
