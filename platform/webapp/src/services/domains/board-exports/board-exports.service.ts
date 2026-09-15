/**
 * BoardExports Service — Trustkeep API client (scaffold + product wiring).
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawBoardExportsService = {
  async listBoardExports(signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/board-exports`, { signal });
    return response;
  },

  async createBoardExport(body?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/board-exports`, { body, signal });
    return response;
  },

  async getBoardExport(exportId: string, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/board-exports/${exportId}`, { signal });
    return response;
  }
};

export const boardExportsService = makeService(rawBoardExportsService, "board-exports");
