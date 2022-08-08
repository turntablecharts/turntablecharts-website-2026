export type NewsItem = {
  id: number;
  dateCreated: string;
  ttcUserId: number;
  ttcUser: TTCUser | null;
  headerImageUri: string;
  newsContent: string;
  category: string;
  description: string;
  newsCategoryId: number;
  title: string;
  isDeleted: boolean;
};

type TTCUser = {
  bio: string;
  email: string;
  firstName: string;
  gender: string | null;
  id: number;
  lastName: string;
};

export type NewsSummary = {
  id: number;
  title: string;
  dateCreated: string;
  headerImageUri: string;
};

export interface NewsResponsePaginated {
  news: NewsSummary[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
}
