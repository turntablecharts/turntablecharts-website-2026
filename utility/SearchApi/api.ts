import TTCRequest from "lib/axios";

interface SearchResponse {
  data: string[];
  isSuccess: boolean;
}

export const searchArtisteByQuery = async (query: string) => {
  const response = await TTCRequest.get<SearchResponse>(
    `/api/search/artistes?artiste=${encodeURIComponent(query)}`
  );
  return response;
};

export const searchSongByQuery = async (query: string) => {
  const response = await TTCRequest.get<SearchResponse>(
    `/api/search/songs?song=${encodeURIComponent(query)}`
  );
  return response;
};
