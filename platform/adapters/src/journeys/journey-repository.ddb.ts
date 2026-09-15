/**
 * JourneyRepository — in-memory sandbox (hand-maintained).
 */

import type { JourneyRepository } from '@trustkeep/services/journeys';
import {
  getRow,
  listRows,
  nowIso,
  putRow,
  upsertRow,
} from '../_shared/product-sandbox-store.js';

const STORE = 'journeys';

export class JourneyRepositoryDdb implements JourneyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listJourneys(input: Parameters<JourneyRepository['listJourneys']>[0]) {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<JourneyRepository['listJourneys']>
    >;
  }

  async createJourney(input: Parameters<JourneyRepository['createJourney']>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id);
    const now = nowIso();
    const row = {
      id,
      name: String(raw.name ?? ''),
      journeyKey: String(raw.journeyKey ?? 'custom'),
      status: 'active',
      trustThreshold: Number(raw.trustThreshold ?? 60),
      valuePropositions: (raw.valuePropositions as string[]) ?? [],
      forgetVolumeOpen: 0,
      createdAt: now,
      updatedAt: now,
    };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<JourneyRepository['createJourney']>
    >;
  }

  async getJourney(input: Parameters<JourneyRepository['getJourney']>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.journeyId ?? raw.id);
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<JourneyRepository['getJourney']>
    >;
  }

  async updateJourney(input: Parameters<JourneyRepository['updateJourney']>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.journeyId ?? raw.id);
    return upsertRow(STORE, id, raw, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<JourneyRepository['updateJourney']>
    >;
  }
}
