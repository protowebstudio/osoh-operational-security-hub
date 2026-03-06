import { ENV } from "../config/env";

let authToken: string | null = localStorage.getItem("auth_token");

export const setAuthToken = (token: string | null): void => {
    authToken = token;
};

const handleUnauthorized = (): void => {
    authToken = null;
    localStorage.removeItem("auth_token");
    window.location.href = "/";
};

export const apiClient = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    console.log("[API_PROBE]", {
    baseUrl: ENV.API_BASE_URL,
    endpoint,
    finalUrl: `${ENV.API_BASE_URL}${endpoint}`,
    options,
  });
  const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
            ...options.headers,
        },
    });

    if (response.status === 401) {
        handleUnauthorized();
        throw new Error("ERR_UNAUTHORIZED");
    }

    if (!response.ok) {
        throw new Error(`ERR_API_${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
  const text = await response.text();
  if (!text) return null as unknown as T;
  if (!contentType.includes('application/json')) {
    throw new Error(`ERR_API_NOT_JSON_${response.status}_${response.url}`);
  }
  return JSON.parse(text) as T;
};
