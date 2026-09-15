let currentOrgId: string | null = 'tnt_demo';
let authOrgId: string | null = 'tnt_demo';

export function setCurrentOrgId(orgId: string | null) {
  currentOrgId = orgId;
}

export function setAuthOrgId(orgId: string | null) {
  authOrgId = orgId;
}

export function getEffectiveOrgId(): string | null {
  return currentOrgId || authOrgId || 'tnt_demo';
}
