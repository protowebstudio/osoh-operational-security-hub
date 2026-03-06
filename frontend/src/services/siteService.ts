import { apiClient } from "./apiClient";

export type CreateSitePayload = {
  name: string;
  risk_threshold_high: number;
  risk_threshold_critical: number;
  risk_window_size: number;
};

export const SiteService = {
  listSites: () => apiClient<any[]>(("/api/sites")),
  createSite: (payload: CreateSitePayload) =>
    apiClient<any>(("/api/sites"), {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

