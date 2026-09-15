/**
 * BreachPlaybooks Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawBreachPlaybooksService = {
  async listBreachIncidents(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/breach-incidents`, { signal });
    return response;
  },

  async openBreachIncident(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/breach-incidents`, { body, signal });
    return response;
  },

  async getBreachIncident(incidentId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/breach-incidents/${incidentId}`, { signal });
    return response;
  },

  async listPlaybookRuns(incidentId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/breach-incidents/${incidentId}/playbook-runs`, { signal });
    return response;
  },

  async startPlaybookRun(incidentId: string, body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/breach-incidents/${incidentId}/playbook-runs`, { body, signal });
    return response;
  },

  async recordPlaybookTrustDelta(runId: string, body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/playbook-runs/${runId}/trust-delta`, { body, signal });
    return response;
  }
};

export const breachPlaybooksService = makeService(rawBreachPlaybooksService, "breach-playbooks");
