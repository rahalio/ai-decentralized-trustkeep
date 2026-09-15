/**
 * BreachPlaybooks Facade
 */

import { breachPlaybooksService } from "./breach-playbooks.service";

export const breachPlaybooksFacade = {
  ...breachPlaybooksService,
};
