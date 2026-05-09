import TTCRequest from 'lib/axios';
import { PowerlistCategoriesResponse, PowerlistEntriesResponse } from './types';

export const getPowerlistCategories = async () => {
  const response = await TTCRequest.get<PowerlistCategoriesResponse>(
    '/api/Powerlist/categories'
  );
  return response;
};

export const getPowerlist = async () => {
  const response = await TTCRequest.get<PowerlistEntriesResponse>(
    '/api/Powerlist'
  );
  return response;
};

export const getPowerlistByCategory = async (categoryId: number | string) => {
  const response = await TTCRequest.get<PowerlistEntriesResponse>(
    `/api/Powerlist?categoryId=${categoryId}`
  );
  return response;
};
