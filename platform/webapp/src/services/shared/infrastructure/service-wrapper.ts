export function makeService<T extends Record<string, unknown>>(
  service: T,
  _domain: string
): T {
  return service;
}
