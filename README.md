# Trustkeep

Enterprise digital-trust scoreboard (journey consent hygiene, breach recovery, stale-PII cost burn-down, monetisation gates).

Product specs: [PRODUCT.md](./PRODUCT.md) · [WEBAPP.md](./WEBAPP.md) · [USER_STORIES.md](./USER_STORIES.md)

OpenAPI-first DDD monorepo based on the zero-apps codegen scaffold. Package scope: **`@trustkeep/*`**.

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp        →  generated clients + product UI
```

## Prerequisites

- Node ≥ 20, pnpm ≥ 9
- Python 3 (for `zero-codegen`)
- Local `.codegen/` tree (see below — **not** in git)

### Rehydrate `.codegen` (required)

`.codegen` is gitignored and must never be committed. Copy from the scaffold:

```bash
rsync -a --delete \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  .codegen/
# Ensure package_scope is @trustkeep in .codegen/.zero-codegen-merged.json
pnpm codegen:paths
```

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: trustkeep_demo_local_dev_key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=trustkeep-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
