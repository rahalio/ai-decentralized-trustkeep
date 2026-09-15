/**
 * DecisionLogs Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawDecisionLogsService = {
  async listDecisionLogs(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/decision-logs`, { signal });
    return response;
  },

  async createDecisionLog(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/decision-logs`, { body, signal });
    return response;
  },

  async getDecisionLog(decisionId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/decision-logs/${decisionId}`, { signal });
    return response;
  }
};

export const decisionLogsService = makeService(rawDecisionLogsService, "decision-logs");
