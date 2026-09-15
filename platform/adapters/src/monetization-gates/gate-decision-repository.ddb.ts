/**
 * GateDecisionRepository — in-memory sandbox.
 */

import type { GateDecisionRepository } from '@trustkeep/services/monetization-gates';
import { nowIso, upsertRow } from '../_shared/product-sandbox-store.js';

const STORE = 'monetization-gates';

export class GateDecisionRepositoryDdb implements GateDecisionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async decideMonetizationGate(
    input: Parameters<GateDecisionRepository['decideMonetizationGate']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.proposalId ?? raw.id);
    const decision = String(raw.decision ?? 'block');
    return upsertRow(
      STORE,
      id,
      {
        status: decision === 'allow' ? 'allowed' : 'blocked',
        decisionRationale: String(raw.rationale ?? ''),
        decidedAt: nowIso(),
        autoBlocked: decision === 'block',
      },
      String(raw.correlationId ?? '')
    ) as Awaited<ReturnType<GateDecisionRepository['decideMonetizationGate']>>;
  }
}
