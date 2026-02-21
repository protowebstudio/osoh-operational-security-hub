import { apiClient } from "./apiClient";
import type { Site } from "../models/site";

export const SiteService = {
    getAll: async (): Promise<Site[]> => {
        return apiClient<Site[]>("/api/sites");
    },

    getById: async (id: number): Promise<Site> => {
        return apiClient<Site>(`/api/sites/${id}`);
    },
};