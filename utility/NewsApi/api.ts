import TTCRequest from "lib/axios";
import { NewsItem } from "./types";

export const getNewsByPageNumber = async (pageNumber: number) => {
  const response = await TTCRequest.get<NewsItem[]>(
    `/api/author/news/all?pageNumber=${pageNumber}`
  );
  return response;
};

export const getSingleNewsById = async (id: string) => {
  const response = await TTCRequest.get<NewsItem>(`/api/author/news/${id}`);
  return response;
};
