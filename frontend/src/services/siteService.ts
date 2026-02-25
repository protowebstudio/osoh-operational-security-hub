import { apiClient } from "./apiClient";

export interface CreateSitePayload {
    name: string;
    risk_threshold_high: number;
    risk_threshold_critical: number;
    risk_window_size: number;
}

export const SiteService = {
    getSites: async () => {
        return apiClient("/api/sites", { method: "GET" });
    },

    createSite: async (payload: CreateSitePayload) => {
        return apiClient("/api/sites", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
};