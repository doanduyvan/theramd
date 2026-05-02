// src/shared/lib/axios.js
import axios from "axios";
import { useAuthStore } from "@/features/auth/store/authStore";

const CONTENT_TYPES = {
  JSON: "application/json",
  FORMDATA: "multipart/form-data",
};

/**
 * option.contentType:
 * - 'json'     -> mặc định application/json
 * - 'formData' -> nếu data là FormData thì bỏ Content-Type để browser tự gắn boundary
 *
 * option.headers:
 * - merge thêm header riêng cho từng request
 */
function buildRequestConfig(options = {}, data) {
  const { contentType = "json", headers = {}, ...restOptions } = options;

  const finalHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (contentType === "formData") {
    // Nếu dùng FormData thật, không set cứng Content-Type
    // để browser tự thêm boundary chính xác.
    if (!(data instanceof FormData)) {
      finalHeaders["Content-Type"] = CONTENT_TYPES.FORMDATA;
    }
  } else {
    finalHeaders["Content-Type"] = CONTENT_TYPES.JSON;
  }

  return {
    ...restOptions,
    headers: finalHeaders,
  };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  timeout: 30000,

  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Nếu request dùng FormData thật mà header bị set cứng multipart/form-data,
    // nên bỏ đi để browser tự thêm boundary.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    } else if (
      !config.headers["Content-Type"] &&
      !config.headers["content-type"]
    ) {
      config.headers["Content-Type"] = CONTENT_TYPES.JSON;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);

export function get(url, options = {}) {
  return api.get(url, buildRequestConfig(options));
}

export function post(url, data = {}, options = {}) {
  return api.post(url, data, buildRequestConfig(options, data));
}

export function put(url, data = {}, options = {}) {
  return api.put(url, data, buildRequestConfig(options, data));
}

export function patch(url, data = {}, options = {}) {
  return api.patch(url, data, buildRequestConfig(options, data));
}

export function del(url, options = {}) {
  return api.delete(url, buildRequestConfig(options));
}

export { CONTENT_TYPES };
export default api;
