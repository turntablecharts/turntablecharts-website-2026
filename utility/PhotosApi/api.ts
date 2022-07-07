import TTCRequest from "lib/axios";
import { PhotoItem } from "./types";

export const getPhotosByPageNumber = async (pageNumber: number) => {
  const response = await TTCRequest.get<PhotoItem[]>(
    `/api/author/photo/all?pageNumber=${pageNumber}`
  );
  return response;
};
