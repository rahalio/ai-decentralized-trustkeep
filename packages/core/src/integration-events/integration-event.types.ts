/**
 * Integration event type definition (hand-maintained).
 * Registry entries are generated under ./generated/registry.ts
 */

export type IntegrationEventTypeDefinition = {
  eventType: string;
  sourceDomain: string;
  schemaVersion: number;
  description?: string;
};
