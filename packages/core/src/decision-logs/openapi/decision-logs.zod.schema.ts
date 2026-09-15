import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDecisionLog_Body = z
  .object({
    title: z.string().min(1).max(200),
    category: z.enum(['compliance', 'business', 'technology']),
    outcome: z.string().min(1).max(2000),
    attendees: z.array(z.string()).optional(),
    journeyId: z
      .string()
      .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    linkedProposalId: z
      .string()
      .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    linkedIncidentId: z
      .string()
      .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    decidedAt: z.string().datetime({ offset: true }),
  })
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
const DecisionLogId = z.string();
const DecisionCategory = z.enum(['compliance', 'business', 'technology']);
const MonetizationProposalId = z.string();
const BreachIncidentId = z.string();
const DecisionLog = z
  .object({
    id: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
    title: z.string().min(1).max(200),
    category: z.enum(['compliance', 'business', 'technology']),
    outcome: z.string().min(1).max(2000),
    attendees: z.array(z.string()).optional(),
    journeyId: z
      .string()
      .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    linkedProposalId: z
      .string()
      .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    linkedIncidentId: z
      .string()
      .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    decidedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DecisionLogListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
          title: z.string().min(1).max(200),
          category: z.enum(['compliance', 'business', 'technology']),
          outcome: z.string().min(1).max(2000),
          attendees: z.array(z.string()).optional(),
          journeyId: z
            .string()
            .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          linkedProposalId: z
            .string()
            .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          linkedIncidentId: z
            .string()
            .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          decidedAt: z.string().datetime({ offset: true }),
          createdAt: z.string().datetime({ offset: true }),
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
const DecisionLogListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
              title: z.string().min(1).max(200),
              category: z.enum(['compliance', 'business', 'technology']),
              outcome: z.string().min(1).max(2000),
              attendees: z.array(z.string()).optional(),
              journeyId: z
                .string()
                .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              linkedProposalId: z
                .string()
                .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              linkedIncidentId: z
                .string()
                .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              decidedAt: z.string().datetime({ offset: true }),
              createdAt: z.string().datetime({ offset: true }),
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
const DecisionLogCreate = z
  .object({
    title: z.string().min(1).max(200),
    category: z.enum(['compliance', 'business', 'technology']),
    outcome: z.string().min(1).max(2000),
    attendees: z.array(z.string()).optional(),
    journeyId: z
      .string()
      .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    linkedProposalId: z
      .string()
      .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    linkedIncidentId: z
      .string()
      .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    decidedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DecisionLogResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
        title: z.string().min(1).max(200),
        category: z.enum(['compliance', 'business', 'technology']),
        outcome: z.string().min(1).max(2000),
        attendees: z.array(z.string()).optional(),
        journeyId: z
          .string()
          .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        linkedProposalId: z
          .string()
          .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        linkedIncidentId: z
          .string()
          .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        decidedAt: z.string().datetime({ offset: true }),
        createdAt: z.string().datetime({ offset: true }),
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
  createDecisionLog_Body,
  JourneyId,
  Problem,
  DecisionLogId,
  DecisionCategory,
  MonetizationProposalId,
  BreachIncidentId,
  DecisionLog,
  DecisionLogListData,
  ResponseMeta,
  DecisionLogListResponse,
  DecisionLogCreate,
  DecisionLogResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/decision-logs',
    alias: 'listDecisionLogs',
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
                  id: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
                  title: z.string().min(1).max(200),
                  category: z.enum(['compliance', 'business', 'technology']),
                  outcome: z.string().min(1).max(2000),
                  attendees: z.array(z.string()).optional(),
                  journeyId: z
                    .string()
                    .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  linkedProposalId: z
                    .string()
                    .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  linkedIncidentId: z
                    .string()
                    .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  decidedAt: z.string().datetime({ offset: true }),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/decision-logs',
    alias: 'createDecisionLog',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDecisionLog_Body,
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
            id: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string().min(1).max(200),
            category: z.enum(['compliance', 'business', 'technology']),
            outcome: z.string().min(1).max(2000),
            attendees: z.array(z.string()).optional(),
            journeyId: z
              .string()
              .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            linkedProposalId: z
              .string()
              .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            linkedIncidentId: z
              .string()
              .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            decidedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/decision-logs/:decisionId',
    alias: 'getDecisionLog',
    requestFormat: 'json',
    parameters: [
      {
        name: 'decisionId',
        type: 'Path',
        schema: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^dlg_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string().min(1).max(200),
            category: z.enum(['compliance', 'business', 'technology']),
            outcome: z.string().min(1).max(2000),
            attendees: z.array(z.string()).optional(),
            journeyId: z
              .string()
              .regex(/^jny_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            linkedProposalId: z
              .string()
              .regex(/^mnz_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            linkedIncidentId: z
              .string()
              .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            decidedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
