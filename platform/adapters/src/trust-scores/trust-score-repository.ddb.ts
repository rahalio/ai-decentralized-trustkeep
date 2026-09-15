/**
 * TrustScoreRepositoryDdb — in-memory sandbox (hand-maintained).
 */

import type { TrustScoreRepository } from "@trustkeep/services/trust-scores";
import {
  getRow,
  listRows,
  nowIso,
  putRow,
  upsertRow,
} from "../_shared/product-sandbox-store.js";

const STORE = "trust-scores";

export class TrustScoreRepositoryDdb implements TrustScoreRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTrustScores(input: Parameters<TrustScoreRepository['listTrustScores']>[0]): Promise<Awaited<ReturnType<TrustScoreRepository['listTrustScores']>>> {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<ReturnType<TrustScoreRepository['listTrustScores']>>;
  }
  async getTrustScore(input: Parameters<TrustScoreRepository['getTrustScore']>[0]): Promise<Awaited<ReturnType<TrustScoreRepository['getTrustScore']>>> {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? raw.journeyId ?? raw.incidentId ?? raw.proposalId ?? raw.decisionId ?? raw.exportId ?? raw.riskId ?? raw.costId ?? raw.trustScoreId ?? raw.runId ?? '');
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<ReturnType<TrustScoreRepository['getTrustScore']>>;
  }
}
