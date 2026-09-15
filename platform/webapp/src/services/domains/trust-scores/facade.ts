/**
 * TrustScores Facade
 */

import { trustScoresService } from "./trust-scores.service";

export const trustScoresFacade = {
  ...trustScoresService,
};
