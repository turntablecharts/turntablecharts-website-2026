export type MagazineEditions = {
  id: number;
  name: string;
  magazineDatas: null;
  coverImageUrl: string;
};

export type EditionArticleSummary = {
  id: number;
  dateCreated: string;
  title: string;
  writer: string;
  headerImage: string;
  magazineEditionDataId: number;
  articlePosition: number;
  description: string;
};

export type MagazineEditionArticles = {
  id: number;
  name: string;
  magazineData: EditionArticleSummary[];
};

export type MagazineArticleItem = {
  id: number;
  dateCreated: string;
  ttcUserId: number;
  ttcUser: null;
  title: string;
  description: string;
  content: string;
  headerImage: string;
  magazineEditionId: number;
  magazineEditionDataId: number;
  articlePosition: number;
  nextArticle: {
    id: number;
    dateCreated: string;
    ttcUserId: number;
    ttcUser: null;
    title: string;
    description: string;
    content: null;
    headerImage: string;
    magazineEditionId: number;
    magazineEditionDataId: number;
    articlePosition: number;
  };
};
