export interface PowerlistEdition {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface PowerlistCategory {
  id: number;
  name: string;
  isActive: boolean;
}

export interface PowerlistEntry {
  id: number;
  rank: number;
  name: string;
  office: string;
  remarks: string;
  imageUrl: string;
  powerlistEditionId: number;
  powerlistCategoryId: number;
  isActive: boolean;
  comments: string;
  commentWriter: string;
}

export interface PowerlistResponse {
  latestEdition: PowerlistEdition;
  categories: PowerlistCategory[];
  recognitions: PowerlistEntry[];
}

export type PowerlistCategoriesResponse = PowerlistCategory[];
export type PowerlistEntriesResponse = PowerlistResponse;

export interface Under30Entry {
  id: number | string;
  image: string;
  headerquote: string;
  name: string;
  age: number;
  role: string;
  bio: string;
  citation: string;
  citationAuthor: string;
  dateAdded: string;
  isActive: boolean;
}
