/**
 * DataHoldingCosts Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawDataHoldingCostsService = {
  async listDataHoldingCosts(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/data-holding-costs`, { signal });
    return response;
  },

  async upsertDataHoldingCost(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/data-holding-costs`, { body, signal });
    return response;
  },

  async getDataHoldingCost(costId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/data-holding-costs/${costId}`, { signal });
    return response;
  }
};

export const dataHoldingCostsService = makeService(rawDataHoldingCostsService, "data-holding-costs");
