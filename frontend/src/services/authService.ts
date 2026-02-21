import { apiClient, setAuthToken } from "./apiClient";
import type { AuthResponse } from "../models/auth";

export const AuthService = {
    login: async (email: string, password: string): Promise<void> => {
        const response = await apiClient<AuthResponse>("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        setAuthToken(response.token);
        localStorage.setItem("auth_token", response.token);
    },

    logout: async (): Promise<void> => {
        await apiClient("/api/logout", { method: "POST" });
        setAuthToken(null);
        localStorage.removeItem("auth_token");
    },

    hydrateFromStorage: (): void => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            setAuthToken(token);
        }
    },
};