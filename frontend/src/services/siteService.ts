import { apiClient } from './apiClient';
import type { Site } from '../models/site';

export const SiteService = {
  getSites: async (): Promise<Site[]> => {
    return apiClient<Site[]>('/api/sites');
  },

  createSite: async (payload: { name: string }): Promise<Site> => {
    return apiClient<Site>('/api/sites', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
