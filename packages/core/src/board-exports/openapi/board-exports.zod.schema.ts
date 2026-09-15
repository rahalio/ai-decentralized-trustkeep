import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createBoardExport_Body = z
  .object({
    periodLabel: z.string().min(1).max(64),
    journeyIds: z
      .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    includeGates: z.boolean().optional().default(true),
    includeBreachRecovery: z.boolean().optional().default(true),
    includeHoldingCosts: z.boolean().optional().default(true),
    includePlatformRisks: z.boolean().optional().default(true),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const BoardExportId = z.string();
const BoardExportStatus = z.enum(['pending', 'ready', 'failed']);
const JourneyId = z.string();
const BoardExport = z
  .object({
    id: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
    periodLabel: z.string(),
    status: z.enum(['pending', 'ready', 'failed']),
    journeyIds: z
      .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    includeGates: z.boolean().optional().default(true),
    includeBreachRecovery: z.boolean().optional().default(true),
    includeHoldingCosts: z.boolean().optional().default(true),
    includePlatformRisks: z.boolean().optional().default(true),
    downloadUrl: z.string().url().optional(),
    gapJourneyIds: z
      .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    readyAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const BoardExportListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
          periodLabel: z.string(),
          status: z.enum(['pending', 'ready', 'failed']),
          journeyIds: z
            .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          includeGates: z.boolean().optional().default(true),
          includeBreachRecovery: z.boolean().optional().default(true),
          includeHoldingCosts: z.boolean().optional().default(true),
          includePlatformRisks: z.boolean().optional().default(true),
          downloadUrl: z.string().url().optional(),
          gapJourneyIds: z
            .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          readyAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const BoardExportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
              periodLabel: z.string(),
              status: z.enum(['pending', 'ready', 'failed']),
              journeyIds: z
                .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              includeGates: z.boolean().optional().default(true),
              includeBreachRecovery: z.boolean().optional().default(true),
              includeHoldingCosts: z.boolean().optional().default(true),
              includePlatformRisks: z.boolean().optional().default(true),
              downloadUrl: z.string().url().optional(),
              gapJourneyIds: z
                .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              readyAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const BoardExportCreate = z
  .object({
    periodLabel: z.string().min(1).max(64),
    journeyIds: z
      .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    includeGates: z.boolean().optional().default(true),
    includeBreachRecovery: z.boolean().optional().default(true),
    includeHoldingCosts: z.boolean().optional().default(true),
    includePlatformRisks: z.boolean().optional().default(true),
  })
  .passthrough();
const BoardExportResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
        periodLabel: z.string(),
        status: z.enum(['pending', 'ready', 'failed']),
        journeyIds: z
          .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        includeGates: z.boolean().optional().default(true),
        includeBreachRecovery: z.boolean().optional().default(true),
        includeHoldingCosts: z.boolean().optional().default(true),
        includePlatformRisks: z.boolean().optional().default(true),
        downloadUrl: z.string().url().optional(),
        gapJourneyIds: z
          .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
        readyAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createBoardExport_Body,
  Problem,
  BoardExportId,
  BoardExportStatus,
  JourneyId,
  BoardExport,
  BoardExportListData,
  ResponseMeta,
  BoardExportListResponse,
  BoardExportCreate,
  BoardExportResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/board-exports',
    alias: 'listBoardExports',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  periodLabel: z.string(),
                  status: z.enum(['pending', 'ready', 'failed']),
                  journeyIds: z
                    .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  includeGates: z.boolean().optional().default(true),
                  includeBreachRecovery: z.boolean().optional().default(true),
                  includeHoldingCosts: z.boolean().optional().default(true),
                  includePlatformRisks: z.boolean().optional().default(true),
                  downloadUrl: z.string().url().optional(),
                  gapJourneyIds: z
                    .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  readyAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/board-exports',
    alias: 'createBoardExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createBoardExport_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodLabel: z.string(),
            status: z.enum(['pending', 'ready', 'failed']),
            journeyIds: z
              .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            includeGates: z.boolean().optional().default(true),
            includeBreachRecovery: z.boolean().optional().default(true),
            includeHoldingCosts: z.boolean().optional().default(true),
            includePlatformRisks: z.boolean().optional().default(true),
            downloadUrl: z.string().url().optional(),
            gapJourneyIds: z
              .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            readyAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/board-exports/:exportId',
    alias: 'getBoardExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'exportId',
        type: 'Path',
        schema: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^bxp_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodLabel: z.string(),
            status: z.enum(['pending', 'ready', 'failed']),
            journeyIds: z
              .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            includeGates: z.boolean().optional().default(true),
            includeBreachRecovery: z.boolean().optional().default(true),
            includeHoldingCosts: z.boolean().optional().default(true),
            includePlatformRisks: z.boolean().optional().default(true),
            downloadUrl: z.string().url().optional(),
            gapJourneyIds: z
              .array(z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            readyAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
