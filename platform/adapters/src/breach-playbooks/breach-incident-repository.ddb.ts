/**
 * BreachIncidentRepositoryDdb — in-memory sandbox (hand-maintained).
 */

import type { BreachIncidentRepository } from "@trustkeep/services/breach-playbooks";
import {
  getRow,
  listRows,
  nowIso,
  putRow,
  upsertRow,
} from "../_shared/product-sandbox-store.js";

const STORE = "breach-playbooks";

export class BreachIncidentRepositoryDdb implements BreachIncidentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listBreachIncidents(input: Parameters<BreachIncidentRepository['listBreachIncidents']>[0]): Promise<Awaited<ReturnType<BreachIncidentRepository['listBreachIncidents']>>> {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<ReturnType<BreachIncidentRepository['listBreachIncidents']>>;
  }
  async openBreachIncident(input: Parameters<BreachIncidentRepository['openBreachIncident']>[0]): Promise<Awaited<ReturnType<BreachIncidentRepository['openBreachIncident']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `auto_${Date.now()}`);
    const now = nowIso();
    const row = { ...raw, id, status: raw.status ?? 'active', createdAt: now, updatedAt: now };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<ReturnType<BreachIncidentRepository['openBreachIncident']>>;
  }
  async getBreachIncident(input: Parameters<BreachIncidentRepository['getBreachIncident']>[0]): Promise<Awaited<ReturnType<BreachIncidentRepository['getBreachIncident']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? raw.journeyId ?? raw.incidentId ?? raw.proposalId ?? raw.decisionId ?? raw.exportId ?? raw.riskId ?? raw.costId ?? raw.trustScoreId ?? raw.runId ?? '');
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<ReturnType<BreachIncidentRepository['getBreachIncident']>>;
  }
}
