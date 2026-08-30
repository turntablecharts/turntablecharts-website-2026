import TTCRequest from 'lib/axios';
import {
  PowerlistCategoriesResponse,
  PowerlistEntriesResponse,
  Under30Entry,
} from './types';

export const get30Under30 = async () => {
  const response = await TTCRequest.get<Under30Entry[]>('/api/UnderThirty');
  return response;
};

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

export interface PowerlistNominationPayload {
  name: string;
  field: string;
  achievement: string;
}

export const submitPowerlistNomination = async (payload: PowerlistNominationPayload) => {
  const response = await TTCRequest.post('/api/public/powerList', payload);
  return response;
};
