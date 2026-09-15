/**
 * DecisionLogs Facade
 */

import { decisionLogsService } from "./decision-logs.service";

export const decisionLogsFacade = {
  ...decisionLogsService,
};
