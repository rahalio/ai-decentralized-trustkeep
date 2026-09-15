/**
 * PlatformRiskRepositoryDdb — in-memory sandbox (hand-maintained).
 */

import type { PlatformRiskRepository } from "@trustkeep/services/platform-risks";
import {
  getRow,
  listRows,
  nowIso,
  putRow,
  upsertRow,
} from "../_shared/product-sandbox-store.js";

const STORE = "platform-risks";

export class PlatformRiskRepositoryDdb implements PlatformRiskRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPlatformRisks(input: Parameters<PlatformRiskRepository['listPlatformRisks']>[0]): Promise<Awaited<ReturnType<PlatformRiskRepository['listPlatformRisks']>>> {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<ReturnType<PlatformRiskRepository['listPlatformRisks']>>;
  }
  async createPlatformRisk(input: Parameters<PlatformRiskRepository['createPlatformRisk']>[0]): Promise<Awaited<ReturnType<PlatformRiskRepository['createPlatformRisk']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `auto_${Date.now()}`);
    const now = nowIso();
    const row = { ...raw, id, status: raw.status ?? 'active', createdAt: now, updatedAt: now };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<ReturnType<PlatformRiskRepository['createPlatformRisk']>>;
  }
  async getPlatformRisk(input: Parameters<PlatformRiskRepository['getPlatformRisk']>[0]): Promise<Awaited<ReturnType<PlatformRiskRepository['getPlatformRisk']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? raw.journeyId ?? raw.incidentId ?? raw.proposalId ?? raw.decisionId ?? raw.exportId ?? raw.riskId ?? raw.costId ?? raw.trustScoreId ?? raw.runId ?? '');
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<ReturnType<PlatformRiskRepository['getPlatformRisk']>>;
  }
  async updatePlatformRisk(input: Parameters<PlatformRiskRepository['updatePlatformRisk']>[0]): Promise<Awaited<ReturnType<PlatformRiskRepository['updatePlatformRisk']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? raw.journeyId ?? raw.incidentId ?? raw.proposalId ?? raw.decisionId ?? raw.exportId ?? raw.riskId ?? raw.costId ?? raw.trustScoreId ?? raw.runId ?? '');
    return upsertRow(STORE, id, { ...raw }, String(raw.correlationId ?? '')) as Awaited<ReturnType<PlatformRiskRepository['updatePlatformRisk']>>;
  }
}
