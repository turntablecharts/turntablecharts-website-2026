export enum ChartCategoryType {
  TurnTableTop50 = "Turntable Top 50",
  TopTvSongs = "TV Top Songs",
  StreamingTop50 = "Streaming Top 50",
  AirplayTop50 = "Airplay Top 50",
}

type ChartDate = {
  id: number;
  dateCreated: string;
  category: ChartCategoryType;
};

export type ChartItem = {
  id: number;
  rank: number;
  title: string;
  artiste: string;
  imageUri: string;
  lastPosition: number;
  highestPosition: number;
  musicLink: string;
  weeksOnChart: number;
  producedBy: string;
};

export interface ChartsByCategoryResponse {
  id: number;
  week: string;
  dateCreated: string;
  category: ChartCategoryType;
  genre: null | string;
  headerVideoUrl: null | string;
  chartItems: ChartItem[];
  isDeleted: boolean;
}

export type ChartCategory = {
  id: number;
  name: string;
  description: string;
  heading: string;
  topSong: {
    rank: number;
    title: string;
    artiste: string;
    imageUri: string;
    lastPosition: string;
    highestPosition: null | string;
    musicLink: string;
    weeksOnChart: number;
    producedBy: string;
  };
};

export interface Top50ChartsWithPrevInfoResponse {
  chartDates: ChartDate[];
  result: ChartsByCategoryResponse;
}
