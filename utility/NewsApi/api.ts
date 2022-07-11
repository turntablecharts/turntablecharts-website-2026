import TTCRequest from "lib/axios";
import { NewsItem, NewsResponsePaginated } from "./types";

export const getNewsByPageNumber = async (pageNumber: number) => {
  const response = await TTCRequest.get<NewsResponsePaginated>(
    `/api/news?pageNumber=${pageNumber}&pageSize=12`
  );
  return response;
};

export const getSingleNewsById = async (id: string) => {
  const response = await TTCRequest.get<NewsItem>(`/api/news/${id}`);
  return response;
};
