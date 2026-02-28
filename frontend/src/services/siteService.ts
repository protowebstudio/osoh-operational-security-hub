import { apiClient } from "./apiClient";
import type { Site } from "../models/site";

export const SiteService = {
  getSites: async (): Promise<Site[]> => {
    return apiClient<Site[]>("/api/sites");
  },

  createSite: async (payload: { name: string; url: string }): Promise<Site> => {
    if (!payload.name || !payload.url) {
      throw new Error("Name and URL are required.");
    }

    if (!/^https?:\/\/.+\..+/.test(payload.url)) {
      throw new Error("URL must be a valid absolute URL (https://...).");
    }

    return apiClient<Site>("/api/sites", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
