import axios from "axios";

interface SearchResponse {
  data: string[];
  isSuccess: boolean;
}

export const searchArtisteByQuery = async (query: string) => {
  const response = await axios.get<SearchResponse>(
    `https://wrappedapi.azurewebsites.net/api/wrap/artistes?artiste=${query}`
  );
  return response;
};

export const searchSongByQuery = async (query: string) => {
  const response = await axios.get<SearchResponse>(
    `https://wrappedapi.azurewebsites.net/api/wrap/songs?song=${query}`
  );
  return response;
};
