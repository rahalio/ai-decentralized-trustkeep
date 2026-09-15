/**
 * PlatformRisks Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawPlatformRisksService = {
  async listPlatformRisks(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/platform-risks`, { signal });
    return response;
  },

  async createPlatformRisk(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/platform-risks`, { body, signal });
    return response;
  },

  async getPlatformRisk(riskId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/platform-risks/${riskId}`, { signal });
    return response;
  },

  async updatePlatformRisk(riskId: string, body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.patch<unknown>(`/v1/platform-risks/${riskId}`, { body, signal });
    return response;
  }
};

export const platformRisksService = makeService(rawPlatformRisksService, "platform-risks");
