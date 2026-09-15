/**
 * TrustScoresComputeRepository — in-memory sandbox with simple scoring.
 */

import type { TrustScoresComputeRepository } from '@trustkeep/services/trust-scores';
import { nowIso, putRow, responseMeta } from '../_shared/product-sandbox-store.js';

const STORE = 'trust-scores';

export class TrustScoresComputeRepositoryDdb implements TrustScoresComputeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async computeTrustScore(
    input: Parameters<TrustScoresComputeRepository['computeTrustScore']>[0]
  ): Promise<Awaited<ReturnType<TrustScoresComputeRepository['computeTrustScore']>>> {
    const raw = input as Record<string, unknown>;
    const journeyId = String(raw.journeyId ?? '');
    const optIn = Number(raw.optInRate ?? 0.6);
    const revoke = Number(raw.revokeRate ?? 0.1);
    const complaint = Number(raw.complaintProxyRate ?? 0);
    const score = Math.max(
      0,
      Math.min(100, optIn * 100 - revoke * 80 - complaint * 40)
    );
    const threshold = Number(raw.trustThreshold ?? 60);
    const gateState = score < threshold ? 'blocked' : 'open';
    const id = String(raw.id ?? `trs_${Date.now()}`);
    const row = {
      id,
      journeyId,
      score,
      consent: { optInRate: optIn, revokeRate: revoke, complaintProxyRate: complaint },
      gateState,
      periodLabel: String(raw.periodLabel ?? new Date().toISOString().slice(0, 7)),
      computedAt: nowIso(),
    };
    putRow(STORE, id, row, String(raw.correlationId ?? ''));
    return { data: row, ...responseMeta(String(raw.correlationId ?? '')) } as Awaited<
      ReturnType<TrustScoresComputeRepository['computeTrustScore']>
    >;
  }
}
