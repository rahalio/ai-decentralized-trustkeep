import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const submitMonetizationProposal_Body = z
  .object({
    journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
    involvesThirdPartyShare: z.boolean().optional().default(false),
    valueProposition: z.string().min(1).max(500),
  })
  .passthrough();
const decideMonetizationGate_Body = z
  .object({
    decision: z.enum(['allow', 'block']),
    rationale: z.string().max(1000).optional(),
  })
  .passthrough();
const JourneyId = z.string();
const MonetizationProposalStatus = z.enum(['submitted', 'allowed', 'blocked']);
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
const MonetizationProposalId = z.string();
const MonetizationProposal = z
  .object({
    id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
    journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['submitted', 'allowed', 'blocked']),
    involvesThirdPartyShare: z.boolean(),
    valueProposition: z.string().min(1).max(500),
    decisionRationale: z.string().max(1000).optional(),
    autoBlocked: z.boolean().optional(),
    trustScoreAtDecision: z.number().optional(),
    createdAt: z.string().datetime({ offset: true }),
    decidedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const MonetizationProposalListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
          journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['submitted', 'allowed', 'blocked']),
          involvesThirdPartyShare: z.boolean(),
          valueProposition: z.string().min(1).max(500),
          decisionRationale: z.string().max(1000).optional(),
          autoBlocked: z.boolean().optional(),
          trustScoreAtDecision: z.number().optional(),
          createdAt: z.string().datetime({ offset: true }),
          decidedAt: z.string().datetime({ offset: true }).optional(),
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
const MonetizationProposalListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
              journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['submitted', 'allowed', 'blocked']),
              involvesThirdPartyShare: z.boolean(),
              valueProposition: z.string().min(1).max(500),
              decisionRationale: z.string().max(1000).optional(),
              autoBlocked: z.boolean().optional(),
              trustScoreAtDecision: z.number().optional(),
              createdAt: z.string().datetime({ offset: true }),
              decidedAt: z.string().datetime({ offset: true }).optional(),
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
const MonetizationProposalCreate = z
  .object({
    journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
    involvesThirdPartyShare: z.boolean().optional().default(false),
    valueProposition: z.string().min(1).max(500),
  })
  .passthrough();
const MonetizationProposalResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
        journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['submitted', 'allowed', 'blocked']),
        involvesThirdPartyShare: z.boolean(),
        valueProposition: z.string().min(1).max(500),
        decisionRationale: z.string().max(1000).optional(),
        autoBlocked: z.boolean().optional(),
        trustScoreAtDecision: z.number().optional(),
        createdAt: z.string().datetime({ offset: true }),
        decidedAt: z.string().datetime({ offset: true }).optional(),
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
const GateDecision = z.enum(['allow', 'block']);
const GateDecisionRequest = z
  .object({
    decision: z.enum(['allow', 'block']),
    rationale: z.string().max(1000).optional(),
  })
  .passthrough();

export const schemas: any = {
  submitMonetizationProposal_Body,
  decideMonetizationGate_Body,
  JourneyId,
  MonetizationProposalStatus,
  Problem,
  MonetizationProposalId,
  MonetizationProposal,
  MonetizationProposalListData,
  ResponseMeta,
  MonetizationProposalListResponse,
  MonetizationProposalCreate,
  MonetizationProposalResponse,
  GateDecision,
  GateDecisionRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/monetization-proposals',
    alias: 'listMonetizationProposals',
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
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['submitted', 'allowed', 'blocked']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
                  journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['submitted', 'allowed', 'blocked']),
                  involvesThirdPartyShare: z.boolean(),
                  valueProposition: z.string().min(1).max(500),
                  decisionRationale: z.string().max(1000).optional(),
                  autoBlocked: z.boolean().optional(),
                  trustScoreAtDecision: z.number().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  decidedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/monetization-proposals',
    alias: 'submitMonetizationProposal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: submitMonetizationProposal_Body,
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
            id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
            journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['submitted', 'allowed', 'blocked']),
            involvesThirdPartyShare: z.boolean(),
            valueProposition: z.string().min(1).max(500),
            decisionRationale: z.string().max(1000).optional(),
            autoBlocked: z.boolean().optional(),
            trustScoreAtDecision: z.number().optional(),
            createdAt: z.string().datetime({ offset: true }),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/monetization-proposals/:proposalId',
    alias: 'getMonetizationProposal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'proposalId',
        type: 'Path',
        schema: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
            journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['submitted', 'allowed', 'blocked']),
            involvesThirdPartyShare: z.boolean(),
            valueProposition: z.string().min(1).max(500),
            decisionRationale: z.string().max(1000).optional(),
            autoBlocked: z.boolean().optional(),
            trustScoreAtDecision: z.number().optional(),
            createdAt: z.string().datetime({ offset: true }),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'post',
    path: '/v1/monetization-proposals/:proposalId/gate-decision',
    alias: 'decideMonetizationGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideMonetizationGate_Body,
      },
      {
        name: 'proposalId',
        type: 'Path',
        schema: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/),
            journeyId: z.string().regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['submitted', 'allowed', 'blocked']),
            involvesThirdPartyShare: z.boolean(),
            valueProposition: z.string().min(1).max(500),
            decisionRationale: z.string().max(1000).optional(),
            autoBlocked: z.boolean().optional(),
            trustScoreAtDecision: z.number().optional(),
            createdAt: z.string().datetime({ offset: true }),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
