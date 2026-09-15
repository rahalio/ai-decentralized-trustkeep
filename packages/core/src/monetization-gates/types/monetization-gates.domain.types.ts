/**
 * Monetization Gates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/monetization-gates.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type GateDecision = components["schemas"]["GateDecision"];
export type JourneyId = components["schemas"]["JourneyId"];
export type MonetizationProposal = components["schemas"]["MonetizationProposal"];
export type MonetizationProposalCreate = components["schemas"]["MonetizationProposalCreate"];
export type MonetizationProposalId = components["schemas"]["MonetizationProposalId"];
export type MonetizationProposalListData = components["schemas"]["MonetizationProposalListData"];
export type MonetizationProposalStatus = components["schemas"]["MonetizationProposalStatus"];
export type GateDecisionRequest = components["schemas"]["GateDecisionRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitMonetizationProposalRequestInput = NonNullable<operations["submitMonetizationProposal"]["requestBody"]>["content"]["application/json"];
export type DecideMonetizationGateRequestInput = NonNullable<operations["decideMonetizationGate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListMonetizationProposalsParams = NonNullable<operations["listMonetizationProposals"]["parameters"]["query"]>;
export type GetMonetizationProposalParams = operations["getMonetizationProposal"]["parameters"]["path"];
export type DecideMonetizationGateParams = operations["decideMonetizationGate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMonetizationProposalsResponse = operations["listMonetizationProposals"]["responses"]["200"]["content"]["application/json"];
export type SubmitMonetizationProposalResponse = operations["submitMonetizationProposal"]["responses"]["201"]["content"]["application/json"];
export type GetMonetizationProposalResponse = operations["getMonetizationProposal"]["responses"]["200"]["content"]["application/json"];
export type DecideMonetizationGateResponse = operations["decideMonetizationGate"]["responses"]["200"]["content"]["application/json"];


