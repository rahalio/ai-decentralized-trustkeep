/**
 * BoardExportRepository — in-memory sandbox.
 */

import type { BoardExportRepository } from '@trustkeep/services/board-exports';
import {
  getRow,
  listRows,
  nowIso,
  putRow,
} from '../_shared/product-sandbox-store.js';

const STORE = 'board-exports';

export class BoardExportRepositoryDdb implements BoardExportRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listBoardExports(
    input: Parameters<BoardExportRepository['listBoardExports']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    return listRows(STORE, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<BoardExportRepository['listBoardExports']>
    >;
  }

  async createBoardExport(
    input: Parameters<BoardExportRepository['createBoardExport']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? `bxp_${Date.now()}`);
    const periodLabel = String(raw.periodLabel ?? new Date().toISOString().slice(0, 7));
    const row = {
      id,
      periodLabel,
      status: 'ready',
      journeyIds: (raw.journeyIds as string[]) ?? [],
      includeGates: raw.includeGates !== false,
      includeBreachRecovery: raw.includeBreachRecovery !== false,
      includeHoldingCosts: raw.includeHoldingCosts !== false,
      includePlatformRisks: raw.includePlatformRisks !== false,
      downloadUrl: `https://trustkeep.local/exports/${id}.pdf`,
      gapJourneyIds: [],
      createdAt: nowIso(),
      readyAt: nowIso(),
    };
    return putRow(STORE, id, row, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<BoardExportRepository['createBoardExport']>
    >;
  }

  async getBoardExport(
    input: Parameters<BoardExportRepository['getBoardExport']>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.exportId ?? raw.id);
    return getRow(STORE, id, String(raw.correlationId ?? '')) as Awaited<
      ReturnType<BoardExportRepository['getBoardExport']>
    >;
  }
}
