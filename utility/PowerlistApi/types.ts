export interface PowerlistCategory {
  id: number;
  name: string;
}

export interface PowerlistEntry {
  id: number;
  rank: number;
  name: string;
  title: string;
  company: string;
  category: string;
  imageUri: string;
  bio: string;
}

export interface PowerlistCategoriesResponse {
  data: PowerlistCategory[];
}

export interface PowerlistEntriesResponse {
  data: PowerlistEntry[];
}
