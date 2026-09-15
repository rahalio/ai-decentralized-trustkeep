/**
 * DecisionLogRepositoryDdb — in-memory sandbox (hand-maintained).
 */

import type { DecisionLogRepository } from "@trustkeep/services/decision-logs";
import {
  getRow,
  listRows,
  nowIso,
  putRow,
  upsertRow,
} from "../_shared/product-sandbox-store.js";

const STORE = "decision-logs";

export class DecisionLogRepositoryDdb implements DecisionLogRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDecisionLogs(input: Parameters<DecisionLogRepository['listDecisionLogs']>[0]): Promise<Awaited<ReturnType<DecisionLogRepository['listDecisionLogs']>>> {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<ReturnType<DecisionLogRepository['listDecisionLogs']>>;
  }
  async createDecisionLog(input: Parameters<DecisionLogRepository['createDecisionLog']>[0]): Promise<Awaited<ReturnType<DecisionLogRepository['createDecisionLog']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `auto_${Date.now()}`);
    const now = nowIso();
    const row = { ...raw, id, status: raw.status ?? 'active', createdAt: now, updatedAt: now };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<ReturnType<DecisionLogRepository['createDecisionLog']>>;
  }
  async getDecisionLog(input: Parameters<DecisionLogRepository['getDecisionLog']>[0]): Promise<Awaited<ReturnType<DecisionLogRepository['getDecisionLog']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? raw.journeyId ?? raw.incidentId ?? raw.proposalId ?? raw.decisionId ?? raw.exportId ?? raw.riskId ?? raw.costId ?? raw.trustScoreId ?? raw.runId ?? '');
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<ReturnType<DecisionLogRepository['getDecisionLog']>>;
  }
}
