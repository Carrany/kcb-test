import axios from "axios";
import { notify } from "./alertsHelper";
import { getAccessToken } from "./authHelper";

const bomaYanguRequest = axios.create({
  baseURL: process.env.REACT_APP_BOMA_YANGU_BASE_URL,
});

const handleSuccessResponse = (response) => {
  const { data } = response;
  console.log(data);
  if (data?.statusCode === "200") {
    notify({
      message: "Success",
      placement: "topRight",
      description: data?.message,
      success: true,
    });
  } else {
    notify({
      message: "Error",
      description: data?.message,
      placement: "topRight",
      error: true,
    });
  }
  return response;
};

const handleErrorResponse = (error) => {
  const { data, status } = error.response;
  if (status >= 400 || data?.statusCode >= 400) {
    let description = data?.message;

    notify({
      message: "Error",
      description: description,
      placement: "topRight",
      error: true,
    });
  }
  return Promise.reject(error);
};

const appendPayloadToRequestData = (request) => {
  request.data = {
    ...(request.data || {}),
    token: getAccessToken() || null,
  };
};

bomaYanguRequest.interceptors.request.use((request) => {
  request.headers["Content-Type"] = "application/json";
  request.headers["Authorization"] =
    "Basic Qm9tYVBvcnRhbENsaWVudDpjYmZiZDBhYi0yODc2LTQ0MmItYTNjOC04YWVkOTYzMmJhODM";

  appendPayloadToRequestData(request);
  return request;
});

bomaYanguRequest.interceptors.response.use(
  handleSuccessResponse,
  handleErrorResponse
);
export { bomaYanguRequest };
