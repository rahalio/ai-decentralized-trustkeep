/**
 * Identity Facade
 */

import { identityService } from "./identity.service";

export const identityFacade = {
  ...identityService,
};
