/**
 * TrustScores Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawTrustScoresService = {
  async listTrustScores(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/trust-scores`, { signal });
    return response;
  },

  async getTrustScore(trustScoreId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/trust-scores/${trustScoreId}`, { signal });
    return response;
  },

  async computeTrustScore(journeyId: string, body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/journeys/${journeyId}/trust-scores:compute`, { body, signal });
    return response;
  }
};

export const trustScoresService = makeService(rawTrustScoresService, "trust-scores");
