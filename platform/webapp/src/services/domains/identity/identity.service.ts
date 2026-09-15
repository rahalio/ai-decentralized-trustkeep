/**
 * Identity Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawIdentityService = {
  async listTenantApiKeys(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v0/tenants/me/api-keys`, { signal });
    return response;
  },

  async operatorLogin(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v0/auth/login`, { body, signal });
    return response;
  },

  async operatorMe(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v0/auth/me`, { signal });
    return response;
  }
};

export const identityService = makeService(rawIdentityService, "identity");
