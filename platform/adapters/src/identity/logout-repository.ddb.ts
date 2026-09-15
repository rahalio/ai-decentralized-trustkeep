/**
 * LogoutRepository — sandbox no-op.
 */

import type { LogoutRepository } from '@trustkeep/services/identity';

export class LogoutRepositoryDdb implements LogoutRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async operatorLogout(
    _input: Parameters<LogoutRepository['operatorLogout']>[0]
  ): Promise<Awaited<ReturnType<LogoutRepository['operatorLogout']>>> {
    return {} as Awaited<ReturnType<LogoutRepository['operatorLogout']>>;
  }
}
