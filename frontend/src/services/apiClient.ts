import { ENV } from "../config/env";

let authToken: string | null = null;

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
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
};