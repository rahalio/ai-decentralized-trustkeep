/**
 * MonetizationProposalRepository — in-memory sandbox with auto-block.
 */

import type { MonetizationProposalRepository } from '@trustkeep/services/monetization-gates';
import {
  getRow,
  listRows,
  nowIso,
  putRow,
} from '../_shared/product-sandbox-store.js';

const STORE = 'monetization-gates';
const SCORES = 'trust-scores';

function latestScoreForJourney(journeyId: string): number | null {
  const g = globalThis as typeof globalThis & {
    __trustkeepStores?: Map<string, Map<string, Record<string, unknown>>>;
  };
  const store = g.__trustkeepStores?.get(SCORES);
  if (!store) return null;
  let best: { score: number; at: string } | null = null;
  for (const row of store.values()) {
    if (String(row.journeyId) !== journeyId) continue;
    const at = String(row.computedAt ?? '');
    const score = Number(row.score ?? 0);
    if (!best || at > best.at) best = { score, at };
  }
  return best?.score ?? null;
}

export class MonetizationProposalRepositoryDdb
  implements MonetizationProposalRepository
{
  constructor(private readonly _dynamoClient: unknown) {}

  async listMonetizationProposals(
    input: Parameters<MonetizationProposalRepository['listMonetizationProposals']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<MonetizationProposalRepository['listMonetizationProposals']>
    >;
  }

  async submitMonetizationProposal(
    input: Parameters<MonetizationProposalRepository['submitMonetizationProposal']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `mnz_${Date.now()}`);
    const journeyId = String(raw.journeyId ?? '');
    const score = latestScoreForJourney(journeyId);
    const threshold = 60;
    const autoBlocked = score != null && score < threshold;
    const row = {
      id,
      journeyId,
      status: autoBlocked ? 'blocked' : 'submitted',
      involvesThirdPartyShare: Boolean(raw.involvesThirdPartyShare),
      valueProposition: String(raw.valueProposition ?? ''),
      autoBlocked,
      trustScoreAtDecision: score ?? undefined,
      createdAt: nowIso(),
    };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<MonetizationProposalRepository['submitMonetizationProposal']>
    >;
  }

  async getMonetizationProposal(
    input: Parameters<MonetizationProposalRepository['getMonetizationProposal']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.proposalId ?? raw.id);
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<MonetizationProposalRepository['getMonetizationProposal']>
    >;
  }
}
