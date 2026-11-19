import { ChartCategoryType } from 'utility/ChartsApi/types';

export type CrosswordDirection = 'across' | 'down';
export type CrosswordAnswerKind = 'song' | 'artist' | 'producer';

export type CrosswordCandidate = {
  key: string;
  answer: string;
  displayAnswer: string;
  kind: CrosswordAnswerKind;
  clue: string;
  rank: number;
};

export type CrosswordPlacement = CrosswordCandidate & {
  id: number;
  number: number;
  row: number;
  col: number;
  direction: CrosswordDirection;
};

export type CrosswordCell = {
  row: number;
  col: number;
  answer: string;
  number?: number;
  placementIds: number[];
};

export type CrosswordPuzzle = {
  id: string;
  title: string;
  chartName: string;
  chartCategoryId: number;
  chartId: number;
  weekLabel: string;
  generatedAt: string;
  rows: number;
  cols: number;
  placements: CrosswordPlacement[];
  cells: Record<string, CrosswordCell>;
};

export type CrosswordPageProps = {
  puzzle: CrosswordPuzzle | null;
  chartCategory: ChartCategoryType | string;
  sourceError?: boolean;
};
