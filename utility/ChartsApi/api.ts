import TTCRequest from "lib/axios";
import {
  ChartCategoryType,
  ChartsByCategoryResponse,
  Top50ChartsWithPrevInfoResponse,
} from "./types";

export const getLatestChartsByCategory = async (
  category: ChartCategoryType
) => {
  const response = await TTCRequest.get<ChartsByCategoryResponse>(
    `/api/author/chart/latest?category=${category}`
  );
  return response;
};

export const getTop50ChartWithPrevInfoByCategpry = async (
  category: ChartCategoryType
) => {
  const response = await TTCRequest.get<Top50ChartsWithPrevInfoResponse>(
    `/api/author/chart/category/lite/${category}`
  );
  return response;
};

export const getChartById = async (id: number) => {
  const response = await TTCRequest.get<ChartsByCategoryResponse>(
    `/api/author/chart/${id}`
  );
  return response;
};
