#!/usr/bin/env node
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(pkgRoot, 'src', '.bundled');
mkdirSync(outDir, { recursive: true });

const domains = [
  'identity',
  'journeys',
  'trust-scores',
  'breach-playbooks',
  'data-holding-costs',
  'monetization-gates',
  'decision-logs',
  'board-exports',
  'platform-risks',
];

for (const domain of domains) {
  const jsonOut = join(outDir, `${domain}.json`);
  const yamlOut = join(outDir, `${domain}.openapi.yaml`);
  for (const out of [jsonOut, yamlOut]) {
    const r = spawnSync('npx', ['redocly', 'bundle', domain, '--output', out], {
      cwd: pkgRoot,
      stdio: 'inherit',
    });
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
}

console.log(`Bundled ${domains.length} domains into src/.bundled/`);
