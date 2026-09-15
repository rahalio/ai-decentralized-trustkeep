/**
 * PlaybookRunRepositoryDdb — in-memory sandbox (hand-maintained).
 */

import type { PlaybookRunRepository } from "@trustkeep/services/breach-playbooks";
import {
  getRow,
  listRows,
  nowIso,
  putRow,
  upsertRow,
} from "../_shared/product-sandbox-store.js";

const STORE = "breach-playbooks";

export class PlaybookRunRepositoryDdb implements PlaybookRunRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPlaybookRuns(input: Parameters<PlaybookRunRepository['listPlaybookRuns']>[0]): Promise<Awaited<ReturnType<PlaybookRunRepository['listPlaybookRuns']>>> {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<ReturnType<PlaybookRunRepository['listPlaybookRuns']>>;
  }
  async startPlaybookRun(input: Parameters<PlaybookRunRepository['startPlaybookRun']>[0]): Promise<Awaited<ReturnType<PlaybookRunRepository['startPlaybookRun']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `auto_${Date.now()}`);
    const now = nowIso();
    const row = { ...raw, id, status: raw.status ?? 'active', createdAt: now, updatedAt: now };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<ReturnType<PlaybookRunRepository['startPlaybookRun']>>;
  }
}
