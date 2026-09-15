import type { ApiResponse, RequestOptions } from './types';

const API_KEY_KEY = 'trustkeep_api_key';
const TOKEN_KEY = 'auth_token';

function getApiBase(): string {
  try {
    const vite = (import.meta as ImportMeta & { env?: Record<string, string> }).env
      ?.VITE_API_BASE;
    if (typeof vite === 'string' && vite.startsWith('http')) {
      return vite.replace(/\/$/, '');
    }
  } catch {
    /* ignore */
  }
  return '';
}

function getApiKey(): string {
  if (typeof window === 'undefined') return 'trustkeep_demo_local_dev_key';
  return localStorage.getItem(API_KEY_KEY) || 'trustkeep_demo_local_dev_key';
}

export class ApiClient {
  setToken = (token: string) => {
    if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
  };

  clearToken = () => {
    if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
  };

  private async request<T>(
    endpoint: string,
    method: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const base = getApiBase();
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // Generated services sometimes prefix /orgs/... — strip to Trustkeep paths.
    const cleaned = path.replace(/^\/orgs\/[^/]+\/+/, '/');
    const url = `${base}${cleaned}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': getApiKey(),
      ...(options.headers || {}),
    };
    const token =
      typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, {
      method,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw Object.assign(new Error(text || res.statusText), {
        statusCode: res.status,
      });
    }

    if (res.status === 204) {
      return { data: undefined as T };
    }

    return (await res.json()) as ApiResponse<T>;
  }

  get = <T>(endpoint: string, options?: RequestOptions) =>
    this.request<T>(endpoint, 'GET', options);
  post = <T>(endpoint: string, options?: RequestOptions) =>
    this.request<T>(endpoint, 'POST', options);
  patch = <T>(endpoint: string, options?: RequestOptions) =>
    this.request<T>(endpoint, 'PATCH', options);
  put = <T>(endpoint: string, options?: RequestOptions) =>
    this.request<T>(endpoint, 'PUT', options);
  delete = <T>(endpoint: string, options?: RequestOptions) =>
    this.request<T>(endpoint, 'DELETE', options);
}

export const apiClient = new ApiClient();
