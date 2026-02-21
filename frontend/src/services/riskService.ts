import { apiClient } from "./apiClient";
import type { RiskSnapshot } from "../models/riskSnapshot";

export const RiskService = {
    getSnapshot: async (siteId: number): Promise<RiskSnapshot> => {
        return apiClient<RiskSnapshot>(`/api/sites/${siteId}/risk`);
    },
};