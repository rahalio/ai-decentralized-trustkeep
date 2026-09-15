/**
 * Breach Playbooks Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/breach-playbooks.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BreachIncident = components["schemas"]["BreachIncident"];
export type BreachIncidentCreate = components["schemas"]["BreachIncidentCreate"];
export type BreachIncidentId = components["schemas"]["BreachIncidentId"];
export type BreachIncidentListData = components["schemas"]["BreachIncidentListData"];
export type BreachIncidentStatus = components["schemas"]["BreachIncidentStatus"];
export type PlaybookKey = components["schemas"]["PlaybookKey"];
export type PlaybookRun = components["schemas"]["PlaybookRun"];
export type PlaybookRunCreate = components["schemas"]["PlaybookRunCreate"];
export type PlaybookRunId = components["schemas"]["PlaybookRunId"];
export type PlaybookRunListData = components["schemas"]["PlaybookRunListData"];
export type PlaybookRunStatus = components["schemas"]["PlaybookRunStatus"];
export type RecordTrustDeltaRequest = components["schemas"]["RecordTrustDeltaRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenBreachIncidentRequestInput = NonNullable<operations["openBreachIncident"]["requestBody"]>["content"]["application/json"];
export type StartPlaybookRunRequestInput = NonNullable<operations["startPlaybookRun"]["requestBody"]>["content"]["application/json"];
export type RecordPlaybookTrustDeltaRequestInput = NonNullable<operations["recordPlaybookTrustDelta"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListBreachIncidentsParams = NonNullable<operations["listBreachIncidents"]["parameters"]["query"]>;
export type GetBreachIncidentParams = operations["getBreachIncident"]["parameters"]["path"];
export type ListPlaybookRunsParams = operations["listPlaybookRuns"]["parameters"]["path"];
export type StartPlaybookRunParams = operations["startPlaybookRun"]["parameters"]["path"];
export type RecordPlaybookTrustDeltaParams = operations["recordPlaybookTrustDelta"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListBreachIncidentsResponse = operations["listBreachIncidents"]["responses"]["200"]["content"]["application/json"];
export type OpenBreachIncidentResponse = operations["openBreachIncident"]["responses"]["201"]["content"]["application/json"];
export type GetBreachIncidentResponse = operations["getBreachIncident"]["responses"]["200"]["content"]["application/json"];
export type ListPlaybookRunsResponse = operations["listPlaybookRuns"]["responses"]["200"]["content"]["application/json"];
export type StartPlaybookRunResponse = operations["startPlaybookRun"]["responses"]["202"]["content"]["application/json"];
export type RecordPlaybookTrustDeltaResponse = operations["recordPlaybookTrustDelta"]["responses"]["200"]["content"]["application/json"];


