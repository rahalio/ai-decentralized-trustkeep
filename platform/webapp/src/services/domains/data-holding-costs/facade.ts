/**
 * DataHoldingCosts Facade
 */

import { dataHoldingCostsService } from "./data-holding-costs.service";

export const dataHoldingCostsFacade = {
  ...dataHoldingCostsService,
};
