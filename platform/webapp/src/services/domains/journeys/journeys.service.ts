/**
 * Journeys Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawJourneysService = {
  async listJourneys(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/journeys`, { signal });
    return response;
  },

  async createJourney(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/journeys`, { body, signal });
    return response;
  },

  async getJourney(journeyId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/journeys/${journeyId}`, { signal });
    return response;
  },

  async updateJourney(journeyId: string, body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.patch<unknown>(`/v1/journeys/${journeyId}`, { body, signal });
    return response;
  }
};

export const journeysService = makeService(rawJourneysService, "journeys");
