export function validateApiResponse<T>(_schema: unknown, data: T): T {
  return data;
}

export function formatValidationError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
