import TTCRequest from "lib/axios";
import {
  MagazineArticleItem,
  MagazineEditionArticles,
  MagazineEditions,
} from "./types";

export const getAllMagazineEditions = async () => {
  const response = await TTCRequest.get<MagazineEditions[]>(
    "/api/author/magazine/editions"
  );
  return response;
};

export const getSingleMagazineEditionByName = async (editionName: string) => {
  const response = await TTCRequest.get<MagazineEditionArticles>(
    `/api/author/magazine/edition/${editionName}`
  );
  return response;
};

export const getSingleMagazineArticleById = async (id: string) => {
  const response = await TTCRequest.get<MagazineArticleItem>(
    `/api/author/magazine/${id}`
  );
  return response;
};
