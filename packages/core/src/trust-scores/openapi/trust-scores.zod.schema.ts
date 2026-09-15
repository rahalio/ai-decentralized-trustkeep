import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const computeTrustScore_Body = z
  .object({
    periodLabel: z.string(),
    optInRate: z.number().gte(0).lte(1),
    revokeRate: z.number().gte(0).lte(1),
    complaintProxyRate: z.number().gte(0).lte(1),
  })
  .partial()
  .passthrough();
const JourneyId = z.string();
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
const TrustScoreId = z.string();
const ConsentMetric = z
  .object({
    optInRate: z.number().gte(0).lte(1),
    revokeRate: z.number().gte(0).lte(1),
    complaintProxyRate: z.number().gte(0).lte(1).optional(),
  })
  .passthrough();
const GateState = z.enum(['open', 'blocked']);
const TrustScore = z
  .object({
    id: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
    journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
    score: z.number().gte(0).lte(100),
    consent: z
      .object({
        optInRate: z.number().gte(0).lte(1),
        revokeRate: z.number().gte(0).lte(1),
        complaintProxyRate: z.number().gte(0).lte(1).optional(),
      })
      .passthrough(),
    gateState: z.enum(['open', 'blocked']),
    periodLabel: z.string().optional(),
    computedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TrustScoreListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
          journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
          score: z.number().gte(0).lte(100),
          consent: z
            .object({
              optInRate: z.number().gte(0).lte(1),
              revokeRate: z.number().gte(0).lte(1),
              complaintProxyRate: z.number().gte(0).lte(1).optional(),
            })
            .passthrough(),
          gateState: z.enum(['open', 'blocked']),
          periodLabel: z.string().optional(),
          computedAt: z.string().datetime({ offset: true }),
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
const TrustScoreListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
              journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
              score: z.number().gte(0).lte(100),
              consent: z
                .object({
                  optInRate: z.number().gte(0).lte(1),
                  revokeRate: z.number().gte(0).lte(1),
                  complaintProxyRate: z.number().gte(0).lte(1).optional(),
                })
                .passthrough(),
              gateState: z.enum(['open', 'blocked']),
              periodLabel: z.string().optional(),
              computedAt: z.string().datetime({ offset: true }),
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
const ComputeTrustScoreRequest = z
  .object({
    periodLabel: z.string(),
    optInRate: z.number().gte(0).lte(1),
    revokeRate: z.number().gte(0).lte(1),
    complaintProxyRate: z.number().gte(0).lte(1),
  })
  .partial()
  .passthrough();
const TrustScoreResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
        journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
        score: z.number().gte(0).lte(100),
        consent: z
          .object({
            optInRate: z.number().gte(0).lte(1),
            revokeRate: z.number().gte(0).lte(1),
            complaintProxyRate: z.number().gte(0).lte(1).optional(),
          })
          .passthrough(),
        gateState: z.enum(['open', 'blocked']),
        periodLabel: z.string().optional(),
        computedAt: z.string().datetime({ offset: true }),
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
  computeTrustScore_Body,
  JourneyId,
  Problem,
  TrustScoreId,
  ConsentMetric,
  GateState,
  TrustScore,
  TrustScoreListData,
  ResponseMeta,
  TrustScoreListResponse,
  ComputeTrustScoreRequest,
  TrustScoreResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/journeys/:journeyId/trust-scores:compute',
    alias: 'computeTrustScore',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: computeTrustScore_Body.optional(),
      },
      {
        name: 'journeyId',
        type: 'Path',
        schema: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
            journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
            score: z.number().gte(0).lte(100),
            consent: z
              .object({
                optInRate: z.number().gte(0).lte(1),
                revokeRate: z.number().gte(0).lte(1),
                complaintProxyRate: z.number().gte(0).lte(1).optional(),
              })
              .passthrough(),
            gateState: z.enum(['open', 'blocked']),
            periodLabel: z.string().optional(),
            computedAt: z.string().datetime({ offset: true }),
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
  {
    method: 'get',
    path: '/v1/trust-scores',
    alias: 'listTrustScores',
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
      {
        name: 'journeyId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
                  journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
                  score: z.number().gte(0).lte(100),
                  consent: z
                    .object({
                      optInRate: z.number().gte(0).lte(1),
                      revokeRate: z.number().gte(0).lte(1),
                      complaintProxyRate: z.number().gte(0).lte(1).optional(),
                    })
                    .passthrough(),
                  gateState: z.enum(['open', 'blocked']),
                  periodLabel: z.string().optional(),
                  computedAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/trust-scores/:trustScoreId',
    alias: 'getTrustScore',
    requestFormat: 'json',
    parameters: [
      {
        name: 'trustScoreId',
        type: 'Path',
        schema: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^trs_[0-9A-HJKMNP-TV-Z]{26}$/),
            journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
            score: z.number().gte(0).lte(100),
            consent: z
              .object({
                optInRate: z.number().gte(0).lte(1),
                revokeRate: z.number().gte(0).lte(1),
                complaintProxyRate: z.number().gte(0).lte(1).optional(),
              })
              .passthrough(),
            gateState: z.enum(['open', 'blocked']),
            periodLabel: z.string().optional(),
            computedAt: z.string().datetime({ offset: true }),
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
