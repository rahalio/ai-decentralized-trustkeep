---
name: codegen-never-commit
description: >-
  Keep .codegen local-only for Trustkeep. Use when committing, pushing, staging
  files, reviewing git status, or setting up a fresh clone that needs zero-codegen.
---

# Never commit `.codegen`

## Rule

`.codegen/` (vendored `zero-codegen`) must **never** be committed or pushed to GitHub for this repository.

## Why

The tool is large and machine-local; Trustkeep rehydrates it from the shared scaffold instead of shipping it in git.

## Setup after clone

```bash
rsync -a --delete \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  .codegen/
pnpm codegen:paths
```

Adjust the scaffold path if your machine layout differs. Confirm `package_scope` is `"@trustkeep"` in `.codegen/.zero-codegen-merged.json` after copy.

## Git hygiene

- Rely on `.gitignore` entries for `.codegen/`, `codegen/`, and `**/zero_codegen/`.
- If `.codegen` appears in `git status`, unstage it — do not `git add -f`.
