/**
 * Platform Risks Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/platform-risks.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type JourneyId = components["schemas"]["JourneyId"];
export type PlatformRisk = components["schemas"]["PlatformRisk"];
export type PlatformRiskCreate = components["schemas"]["PlatformRiskCreate"];
export type PlatformRiskId = components["schemas"]["PlatformRiskId"];
export type PlatformRiskListData = components["schemas"]["PlatformRiskListData"];
export type PlatformRiskSeverity = components["schemas"]["PlatformRiskSeverity"];
export type PlatformRiskStatus = components["schemas"]["PlatformRiskStatus"];
export type PlatformRiskUpdate = components["schemas"]["PlatformRiskUpdate"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePlatformRiskRequestInput = NonNullable<operations["createPlatformRisk"]["requestBody"]>["content"]["application/json"];
export type UpdatePlatformRiskRequestInput = NonNullable<operations["updatePlatformRisk"]["requestBody"]>["content"]["application/json"];
export type UpdatePlatformRiskRequest = UpdatePlatformRiskRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPlatformRisksParams = NonNullable<operations["listPlatformRisks"]["parameters"]["query"]>;
export type GetPlatformRiskParams = operations["getPlatformRisk"]["parameters"]["path"];
export type UpdatePlatformRiskParams = operations["updatePlatformRisk"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPlatformRisksResponse = operations["listPlatformRisks"]["responses"]["200"]["content"]["application/json"];
export type CreatePlatformRiskResponse = operations["createPlatformRisk"]["responses"]["201"]["content"]["application/json"];
export type GetPlatformRiskResponse = operations["getPlatformRisk"]["responses"]["200"]["content"]["application/json"];
export type UpdatePlatformRiskResponse = operations["updatePlatformRisk"]["responses"]["200"]["content"]["application/json"];


