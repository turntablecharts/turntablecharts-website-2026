import TTCRequest from "lib/axios";
import { GalleryResponse } from "./types";

export const getPhotosByPageNumber = async (pageNumber: number) => {
  const response = await TTCRequest.get<GalleryResponse>(
    `/api/Gallery?pageNumber=${pageNumber}`
  );
  return response;
};
