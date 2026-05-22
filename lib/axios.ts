import axios from "axios";

const isBrowser = typeof window !== 'undefined';

const baseUrl = isBrowser
  ? "/api/ttc-proxy"
  : (process.env.TTC_BACKEND_URL || "https://turntablechartsapi.azurewebsites.net");

const TTCRequest = axios.create({
  baseURL: baseUrl,
  timeout: 180000,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_TTC_API_KEY || "",
  },
});

const decodeBase64UTF8 = (base64String: string): string => {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
};

const requestResponseHandler = (response: any) => {
  if (response.data && typeof response.data.payload === 'string') {
    try {
      const decodedData = decodeBase64UTF8(response.data.payload);
      response.data = JSON.parse(decodedData);
    } catch (e) {
      console.error("Failed to decode obfuscated response payload:", e);
    }
  }
  return response;
};

const requestErrorHandler = (error: any) => {
  if (error.response && error.response.data && typeof error.response.data.payload === 'string') {
    try {
      const decodedData = decodeBase64UTF8(error.response.data.payload);
      error.response.data = JSON.parse(decodedData);
    } catch (e) {
      console.error("Failed to decode obfuscated error payload:", e);
    }
  }
  return Promise.reject(error);
};

TTCRequest.interceptors.response.use(requestResponseHandler, requestErrorHandler);

export default TTCRequest;
