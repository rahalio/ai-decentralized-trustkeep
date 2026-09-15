/**
 * BoardExports Facade
 */

import { boardExportsService } from "./board-exports.service";

export const boardExportsFacade = {
  ...boardExportsService,
};
