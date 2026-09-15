/**
 * Postman-collection 1:1 Vitest tests for platform-risks (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  limit: "",
  riskId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / platform-risks (1:1 generated)", () => {

  it("listPlatformRisks", async () => {
    const url = sub("{{baseUrl}}/v1/platform-risks?cursor={{cursor}}&limit={{limit}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createPlatformRisk", async () => {
    const url = sub("{{baseUrl}}/v1/platform-risks");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"title\": \"Engineer\",\n  \"description\": \"\",\n  \"severity\": \"low\",\n  \"owner\": \"\",\n  \"status\": \"monitored_clear\",\n  \"linkedJourneyId\": \"newman_linkedJourneyId\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['platformRiskId'] = j.data.id;
  });

  it("getPlatformRisk", async () => {
    const url = sub("{{baseUrl}}/v1/platform-risks/{{riskId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("updatePlatformRisk", async () => {
    const url = sub("{{baseUrl}}/v1/platform-risks/{{riskId}}");
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"title\": \"Engineer\",\n  \"description\": \"\",\n  \"status\": \"monitored_clear\",\n  \"severity\": \"low\",\n  \"owner\": \"\",\n  \"mitigationNotes\": \"\",\n  \"linkedJourneyId\": \"newman_linkedJourneyId\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
