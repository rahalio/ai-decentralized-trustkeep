/**
 * TrustDeltumRepositoryDdb — in-memory sandbox (hand-maintained).
 */

import type { TrustDeltumRepository } from "@trustkeep/services/breach-playbooks";
import {
  getRow,
  listRows,
  nowIso,
  putRow,
  upsertRow,
} from "../_shared/product-sandbox-store.js";

const STORE = "breach-playbooks";

export class TrustDeltumRepositoryDdb implements TrustDeltumRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async recordPlaybookTrustDelta(input: Parameters<TrustDeltumRepository['recordPlaybookTrustDelta']>[0]): Promise<Awaited<ReturnType<TrustDeltumRepository['recordPlaybookTrustDelta']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `auto_${Date.now()}`);
    const now = nowIso();
    const row = { ...raw, id, status: raw.status ?? 'active', createdAt: now, updatedAt: now };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<ReturnType<TrustDeltumRepository['recordPlaybookTrustDelta']>>;
  }
}
