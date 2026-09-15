/**
 * IdGeneratorService Port — Trustkeep domain prefixes.
 */

import type { DomainCode } from '@trustkeep/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  jnyId(): string;
  trsId(): string;
  brcId(): string;
  dhcId(): string;
  mnzId(): string;
  dlgId(): string;
  bxpId(): string;
  prkId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
