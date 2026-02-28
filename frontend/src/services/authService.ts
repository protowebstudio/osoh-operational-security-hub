import { apiClient, setAuthToken } from "./apiClient";
import type { AuthResponse } from "../models/auth";

export const AuthService = {
    login: async (email: string, password: string): Promise<void> => {
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const response = await apiClient<AuthResponse>("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        if (!response?.token) {
            throw new Error("Invalid authentication response.");
        }

        setAuthToken(response.token);
        localStorage.setItem("auth_token", response.token);
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient("/api/logout", { method: "POST" });
        } catch {
            // ignore network/logout failures
        } finally {
            setAuthToken(null);
            localStorage.removeItem("auth_token");
        }
    },

    hydrateFromStorage: (): void => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            setAuthToken(token);
        }
    },
};
