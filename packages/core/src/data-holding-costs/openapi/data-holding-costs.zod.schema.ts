import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const upsertDataHoldingCost_Body = z
  .object({
    datasetName: z.string().min(1).max(160),
    inactiveRecords: z.number().int().gte(0),
    annualCostPerRecord: z.number().default(1.5),
    burnDownTargetRecords: z.number().int().gte(0).optional(),
    cleansedRecords: z.number().int().gte(0).optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
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
const DataHoldingCostId = z.string();
const Currency = z.string();
const DataHoldingCost = z
  .object({
    id: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
    datasetName: z.string().min(1).max(160),
    inactiveRecords: z.number().int().gte(0),
    annualCostPerRecord: z.number(),
    estimatedAnnualCost: z.number(),
    burnDownTargetRecords: z.number().int().gte(0).optional(),
    cleansedRecords: z.number().int().gte(0).optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DataHoldingCostListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
          datasetName: z.string().min(1).max(160),
          inactiveRecords: z.number().int().gte(0),
          annualCostPerRecord: z.number(),
          estimatedAnnualCost: z.number(),
          burnDownTargetRecords: z.number().int().gte(0).optional(),
          cleansedRecords: z.number().int().gte(0).optional(),
          currency: z
            .string()
            .min(3)
            .max(3)
            .regex(/^[A-Z]{3}$/)
            .optional(),
          updatedAt: z.string().datetime({ offset: true }),
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
const DataHoldingCostListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
              datasetName: z.string().min(1).max(160),
              inactiveRecords: z.number().int().gte(0),
              annualCostPerRecord: z.number(),
              estimatedAnnualCost: z.number(),
              burnDownTargetRecords: z.number().int().gte(0).optional(),
              cleansedRecords: z.number().int().gte(0).optional(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/)
                .optional(),
              updatedAt: z.string().datetime({ offset: true }),
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
const DataHoldingCostUpsert = z
  .object({
    datasetName: z.string().min(1).max(160),
    inactiveRecords: z.number().int().gte(0),
    annualCostPerRecord: z.number().default(1.5),
    burnDownTargetRecords: z.number().int().gte(0).optional(),
    cleansedRecords: z.number().int().gte(0).optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
  })
  .passthrough();
const DataHoldingCostResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
        datasetName: z.string().min(1).max(160),
        inactiveRecords: z.number().int().gte(0),
        annualCostPerRecord: z.number(),
        estimatedAnnualCost: z.number(),
        burnDownTargetRecords: z.number().int().gte(0).optional(),
        cleansedRecords: z.number().int().gte(0).optional(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/)
          .optional(),
        updatedAt: z.string().datetime({ offset: true }),
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
  upsertDataHoldingCost_Body,
  Problem,
  DataHoldingCostId,
  Currency,
  DataHoldingCost,
  DataHoldingCostListData,
  ResponseMeta,
  DataHoldingCostListResponse,
  DataHoldingCostUpsert,
  DataHoldingCostResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/data-holding-costs',
    alias: 'listDataHoldingCosts',
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
                  id: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  datasetName: z.string().min(1).max(160),
                  inactiveRecords: z.number().int().gte(0),
                  annualCostPerRecord: z.number(),
                  estimatedAnnualCost: z.number(),
                  burnDownTargetRecords: z.number().int().gte(0).optional(),
                  cleansedRecords: z.number().int().gte(0).optional(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/)
                    .optional(),
                  updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/data-holding-costs',
    alias: 'upsertDataHoldingCost',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertDataHoldingCost_Body,
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
            id: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
            datasetName: z.string().min(1).max(160),
            inactiveRecords: z.number().int().gte(0),
            annualCostPerRecord: z.number(),
            estimatedAnnualCost: z.number(),
            burnDownTargetRecords: z.number().int().gte(0).optional(),
            cleansedRecords: z.number().int().gte(0).optional(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/data-holding-costs/:costId',
    alias: 'getDataHoldingCost',
    requestFormat: 'json',
    parameters: [
      {
        name: 'costId',
        type: 'Path',
        schema: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^dhc_[0-9A-HJKMNP-TV-Z]{26}$/),
            datasetName: z.string().min(1).max(160),
            inactiveRecords: z.number().int().gte(0),
            annualCostPerRecord: z.number(),
            estimatedAnnualCost: z.number(),
            burnDownTargetRecords: z.number().int().gte(0).optional(),
            cleansedRecords: z.number().int().gte(0).optional(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            updatedAt: z.string().datetime({ offset: true }),
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
