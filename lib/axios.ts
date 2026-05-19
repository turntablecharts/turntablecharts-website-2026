import axios from "axios";

const isBrowser = typeof window !== 'undefined';

const baseUrl = isBrowser
  ? "/api/ttc-proxy"
  : (process.env.TTC_BACKEND_URL || "https://turntablechartsapi.azurewebsites.net");

const TTCRequest = axios.create({
  baseURL: baseUrl,
  timeout: 180000,
});

if (!isBrowser) {
  TTCRequest.interceptors.request.use((config) => {
    const apiKey = process.env.TTC_API_KEY;
    if (apiKey) {
      config.headers = config.headers || {};
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  });
}

const requestResponseHandler = (response: any) => {
  return response;
};

TTCRequest.interceptors.response.use(requestResponseHandler);

export default TTCRequest;
