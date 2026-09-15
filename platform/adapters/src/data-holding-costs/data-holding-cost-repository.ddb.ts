/**
 * DataHoldingCostRepository — in-memory sandbox.
 */

import type { DataHoldingCostRepository } from '@trustkeep/services/data-holding-costs';
import {
  getRow,
  listRows,
  nowIso,
  putRow,
} from '../_shared/product-sandbox-store.js';

const STORE = 'data-holding-costs';

export class DataHoldingCostRepositoryDdb implements DataHoldingCostRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDataHoldingCosts(
    input: Parameters<DataHoldingCostRepository['listDataHoldingCosts']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<DataHoldingCostRepository['listDataHoldingCosts']>
    >;
  }

  async upsertDataHoldingCost(
    input: Parameters<DataHoldingCostRepository['upsertDataHoldingCost']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `dhc_${Date.now()}`);
    const inactiveRecords = Number(raw.inactiveRecords ?? 0);
    const annualCostPerRecord = Number(raw.annualCostPerRecord ?? 1.5);
    const row = {
      id,
      datasetName: String(raw.datasetName ?? ''),
      inactiveRecords,
      annualCostPerRecord,
      estimatedAnnualCost: inactiveRecords * annualCostPerRecord,
      burnDownTargetRecords: Number(raw.burnDownTargetRecords ?? 0),
      cleansedRecords: Number(raw.cleansedRecords ?? 0),
      currency: String(raw.currency ?? 'USD'),
      updatedAt: nowIso(),
    };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<DataHoldingCostRepository['upsertDataHoldingCost']>
    >;
  }

  async getDataHoldingCost(
    input: Parameters<DataHoldingCostRepository['getDataHoldingCost']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.costId ?? raw.id);
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<DataHoldingCostRepository['getDataHoldingCost']>
    >;
  }
}
