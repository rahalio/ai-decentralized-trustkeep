export type ApiResponse<T> = { data: T; meta?: Record<string, unknown> };
export type ApiError = { statusCode: number; message: string };
export type RequestOptions = {
  body?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
};
