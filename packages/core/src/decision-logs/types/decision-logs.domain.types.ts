/**
 * Decision Logs Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/decision-logs.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BreachIncidentId = components["schemas"]["BreachIncidentId"];
export type DecisionCategory = components["schemas"]["DecisionCategory"];
export type DecisionLog = components["schemas"]["DecisionLog"];
export type DecisionLogCreate = components["schemas"]["DecisionLogCreate"];
export type DecisionLogId = components["schemas"]["DecisionLogId"];
export type DecisionLogListData = components["schemas"]["DecisionLogListData"];
export type JourneyId = components["schemas"]["JourneyId"];
export type MonetizationProposalId = components["schemas"]["MonetizationProposalId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDecisionLogRequestInput = NonNullable<operations["createDecisionLog"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDecisionLogsParams = NonNullable<operations["listDecisionLogs"]["parameters"]["query"]>;
export type GetDecisionLogParams = operations["getDecisionLog"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDecisionLogsResponse = operations["listDecisionLogs"]["responses"]["200"]["content"]["application/json"];
export type CreateDecisionLogResponse = operations["createDecisionLog"]["responses"]["201"]["content"]["application/json"];
export type GetDecisionLogResponse = operations["getDecisionLog"]["responses"]["200"]["content"]["application/json"];


