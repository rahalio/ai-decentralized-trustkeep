/**
 * Process-wide in-memory stores for Trustkeep product domains (local sandbox).
 */

import { nowIso, responseMeta } from './sandbox-store.js';

type Row = Record<string, unknown>;

function storeFor(name: string): Map<string, Row> {
  const g = globalThis as typeof globalThis & {
    __trustkeepStores?: Map<string, Map<string, Row>>;
  };
  if (!g.__trustkeepStores) g.__trustkeepStores = new Map();
  let s = g.__trustkeepStores.get(name);
  if (!s) {
    s = new Map();
    g.__trustkeepStores.set(name, s);
  }
  return s;
}

export function listRows(storeName: string, correlationId?: string) {
  const items = [...storeFor(storeName).values()];
  return { data: { items }, ...responseMeta(correlationId) };
}

export function getRow(storeName: string, id: string, correlationId?: string) {
  const row = storeFor(storeName).get(id);
  if (!row) {
    const err = new Error(`Not found: ${id}`) as Error & { statusCode?: number };
    err.statusCode = 404;
    throw err;
  }
  return { data: row, ...responseMeta(correlationId) };
}

export function putRow(
  storeName: string,
  id: string,
  row: Row,
  correlationId?: string
) {
  storeFor(storeName).set(id, row);
  return { data: row, ...responseMeta(correlationId) };
}

export function upsertRow(
  storeName: string,
  id: string,
  patch: Row,
  correlationId?: string
) {
  const prev = storeFor(storeName).get(id) ?? {};
  const next = { ...prev, ...patch, id, updatedAt: nowIso() };
  storeFor(storeName).set(id, next);
  return { data: next, ...responseMeta(correlationId) };
}

export { nowIso, responseMeta };
