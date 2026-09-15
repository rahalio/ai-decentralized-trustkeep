/**
 * Board Exports Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/board-exports.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BoardExport = components["schemas"]["BoardExport"];
export type BoardExportCreate = components["schemas"]["BoardExportCreate"];
export type BoardExportId = components["schemas"]["BoardExportId"];
export type BoardExportListData = components["schemas"]["BoardExportListData"];
export type BoardExportStatus = components["schemas"]["BoardExportStatus"];
export type JourneyId = components["schemas"]["JourneyId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateBoardExportRequestInput = NonNullable<operations["createBoardExport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListBoardExportsParams = NonNullable<operations["listBoardExports"]["parameters"]["query"]>;
export type GetBoardExportParams = operations["getBoardExport"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListBoardExportsResponse = operations["listBoardExports"]["responses"]["200"]["content"]["application/json"];
export type CreateBoardExportResponse = operations["createBoardExport"]["responses"]["201"]["content"]["application/json"];
export type GetBoardExportResponse = operations["getBoardExport"]["responses"]["200"]["content"]["application/json"];


