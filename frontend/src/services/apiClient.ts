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
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
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

    return response.json() as Promise<T>;
};
