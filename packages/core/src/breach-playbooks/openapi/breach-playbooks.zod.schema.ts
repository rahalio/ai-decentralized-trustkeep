import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openBreachIncident_Body = z
  .object({
    detectedAt: z.string().datetime({ offset: true }),
    summary: z.string().max(500).optional(),
  })
  .passthrough();
const startPlaybookRun_Body = z
  .object({ playbookKey: z.enum(['standard_72h', 'high_sensitivity']) })
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
const BreachIncidentId = z.string();
const BreachIncidentStatus = z.enum([
  'open',
  'notifying',
  'recovered',
  'closed',
]);
const BreachIncident = z
  .object({
    id: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['open', 'notifying', 'recovered', 'closed']),
    summary: z.string().max(500).optional(),
    detectedAt: z.string().datetime({ offset: true }),
    regulatorNotifyDueAt: z.string().datetime({ offset: true }).optional(),
    customerNotifyDueAt: z.string().datetime({ offset: true }).optional(),
    trustDelta: z.number().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const BreachIncidentListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['open', 'notifying', 'recovered', 'closed']),
          summary: z.string().max(500).optional(),
          detectedAt: z.string().datetime({ offset: true }),
          regulatorNotifyDueAt: z
            .string()
            .datetime({ offset: true })
            .optional(),
          customerNotifyDueAt: z.string().datetime({ offset: true }).optional(),
          trustDelta: z.number().optional(),
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
const BreachIncidentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['open', 'notifying', 'recovered', 'closed']),
              summary: z.string().max(500).optional(),
              detectedAt: z.string().datetime({ offset: true }),
              regulatorNotifyDueAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              customerNotifyDueAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              trustDelta: z.number().optional(),
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
const BreachIncidentCreate = z
  .object({
    detectedAt: z.string().datetime({ offset: true }),
    summary: z.string().max(500).optional(),
  })
  .passthrough();
const BreachIncidentResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['open', 'notifying', 'recovered', 'closed']),
        summary: z.string().max(500).optional(),
        detectedAt: z.string().datetime({ offset: true }),
        regulatorNotifyDueAt: z.string().datetime({ offset: true }).optional(),
        customerNotifyDueAt: z.string().datetime({ offset: true }).optional(),
        trustDelta: z.number().optional(),
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
const PlaybookRunId = z.string();
const PlaybookKey = z.enum(['standard_72h', 'high_sensitivity']);
const PlaybookRunStatus = z.enum(['running', 'completed', 'aborted']);
const PlaybookRun = z
  .object({
    id: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    incidentId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
    playbookKey: z.enum(['standard_72h', 'high_sensitivity']),
    status: z.enum(['running', 'completed', 'aborted']),
    startedAt: z.string().datetime({ offset: true }),
    regulatorNotifiedAt: z.string().datetime({ offset: true }).optional(),
    customerNotifiedAt: z.string().datetime({ offset: true }).optional(),
    trustDeltaRecorded: z.number().optional(),
    completedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PlaybookRunListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
          incidentId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
          playbookKey: z.enum(['standard_72h', 'high_sensitivity']),
          status: z.enum(['running', 'completed', 'aborted']),
          startedAt: z.string().datetime({ offset: true }),
          regulatorNotifiedAt: z.string().datetime({ offset: true }).optional(),
          customerNotifiedAt: z.string().datetime({ offset: true }).optional(),
          trustDeltaRecorded: z.number().optional(),
          completedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const PlaybookRunListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
              incidentId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
              playbookKey: z.enum(['standard_72h', 'high_sensitivity']),
              status: z.enum(['running', 'completed', 'aborted']),
              startedAt: z.string().datetime({ offset: true }),
              regulatorNotifiedAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              customerNotifiedAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              trustDeltaRecorded: z.number().optional(),
              completedAt: z.string().datetime({ offset: true }).optional(),
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
const PlaybookRunCreate = z
  .object({ playbookKey: z.enum(['standard_72h', 'high_sensitivity']) })
  .passthrough();
const PlaybookRunResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
        incidentId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
        playbookKey: z.enum(['standard_72h', 'high_sensitivity']),
        status: z.enum(['running', 'completed', 'aborted']),
        startedAt: z.string().datetime({ offset: true }),
        regulatorNotifiedAt: z.string().datetime({ offset: true }).optional(),
        customerNotifiedAt: z.string().datetime({ offset: true }).optional(),
        trustDeltaRecorded: z.number().optional(),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
const RecordTrustDeltaRequest = z
  .object({ trustDelta: z.number() })
  .passthrough();

export const schemas: any = {
  openBreachIncident_Body,
  startPlaybookRun_Body,
  Problem,
  BreachIncidentId,
  BreachIncidentStatus,
  BreachIncident,
  BreachIncidentListData,
  ResponseMeta,
  BreachIncidentListResponse,
  BreachIncidentCreate,
  BreachIncidentResponse,
  PlaybookRunId,
  PlaybookKey,
  PlaybookRunStatus,
  PlaybookRun,
  PlaybookRunListData,
  PlaybookRunListResponse,
  PlaybookRunCreate,
  PlaybookRunResponse,
  RecordTrustDeltaRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/breach-incidents',
    alias: 'listBreachIncidents',
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
                  id: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['open', 'notifying', 'recovered', 'closed']),
                  summary: z.string().max(500).optional(),
                  detectedAt: z.string().datetime({ offset: true }),
                  regulatorNotifyDueAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  customerNotifyDueAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  trustDelta: z.number().optional(),
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
    path: '/v1/breach-incidents',
    alias: 'openBreachIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openBreachIncident_Body,
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
            id: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['open', 'notifying', 'recovered', 'closed']),
            summary: z.string().max(500).optional(),
            detectedAt: z.string().datetime({ offset: true }),
            regulatorNotifyDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            customerNotifyDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            trustDelta: z.number().optional(),
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
    path: '/v1/breach-incidents/:incidentId',
    alias: 'getBreachIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['open', 'notifying', 'recovered', 'closed']),
            summary: z.string().max(500).optional(),
            detectedAt: z.string().datetime({ offset: true }),
            regulatorNotifyDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            customerNotifyDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            trustDelta: z.number().optional(),
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
  {
    method: 'get',
    path: '/v1/breach-incidents/:incidentId/playbook-runs',
    alias: 'listPlaybookRuns',
    requestFormat: 'json',
    parameters: [
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  incidentId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  playbookKey: z.enum(['standard_72h', 'high_sensitivity']),
                  status: z.enum(['running', 'completed', 'aborted']),
                  startedAt: z.string().datetime({ offset: true }),
                  regulatorNotifiedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  customerNotifiedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  trustDeltaRecorded: z.number().optional(),
                  completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/breach-incidents/:incidentId/playbook-runs',
    alias: 'startPlaybookRun',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: startPlaybookRun_Body,
      },
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            incidentId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
            playbookKey: z.enum(['standard_72h', 'high_sensitivity']),
            status: z.enum(['running', 'completed', 'aborted']),
            startedAt: z.string().datetime({ offset: true }),
            regulatorNotifiedAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            customerNotifiedAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            trustDeltaRecorded: z.number().optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/playbook-runs/:runId/trust-delta',
    alias: 'recordPlaybookTrustDelta',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ trustDelta: z.number() }).passthrough(),
      },
      {
        name: 'runId',
        type: 'Path',
        schema: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            incidentId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
            playbookKey: z.enum(['standard_72h', 'high_sensitivity']),
            status: z.enum(['running', 'completed', 'aborted']),
            startedAt: z.string().datetime({ offset: true }),
            regulatorNotifiedAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            customerNotifiedAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            trustDeltaRecorded: z.number().optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
