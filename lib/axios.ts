import axios from "axios";

const baseUrl = "https://turntablechartsapi.azurewebsites.net";

const TTCRequest = axios.create({
  baseURL: baseUrl,
  timeout: 180000,
});

const requestResponseHandler = (response: any) => {
  return response;
};

TTCRequest.interceptors.response.use(requestResponseHandler);

export default TTCRequest;
