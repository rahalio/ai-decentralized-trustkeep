/**
 * MonetizationGates Facade
 */

import { monetizationGatesService } from "./monetization-gates.service";

export const monetizationGatesFacade = {
  ...monetizationGatesService,
};
