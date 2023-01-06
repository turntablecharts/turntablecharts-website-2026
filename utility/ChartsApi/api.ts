import axios from "axios";
import TTCRequest from "lib/axios";
import {
  ChartCategory,
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

export const getChartById = async (id: number | string) => {
  const response = await TTCRequest.get<ChartsByCategoryResponse>(
    `/api/chart/${id}`
  );
  return response;
};

export const getChartByIdAndWeekNumber = async (
  id: number | string,
  weekNumber: number,
  year: number
) => {
  const response = await TTCRequest.get<ChartsByCategoryResponse>(
    `/api/chart/${id}/${weekNumber}/${year}`
  );
  return response;
};

export const getChartCategories = async () => {
  const response = await TTCRequest.get<ChartCategory[]>(
    "/api/chart/categories"
  );
  return response;
};

export const sendWrappedRequest = async (data: { [key: string]: string[] }) => {
  const response = await axios.post(
    "https://wrappedapi.azurewebsites.net/api/wrap/create",
    data
  );

  return response;
};
