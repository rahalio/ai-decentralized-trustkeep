/**
 * MonetizationGates Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawMonetizationGatesService = {
  async listMonetizationProposals(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/monetization-proposals`, { signal });
    return response;
  },

  async submitMonetizationProposal(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/monetization-proposals`, { body, signal });
    return response;
  },

  async getMonetizationProposal(proposalId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/monetization-proposals/${proposalId}`, { signal });
    return response;
  },

  async decideMonetizationGate(proposalId: string, body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/monetization-proposals/${proposalId}/gate-decision`, { body, signal });
    return response;
  }
};

export const monetizationGatesService = makeService(rawMonetizationGatesService, "monetization-gates");
