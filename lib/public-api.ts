const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const API_PREFIX = "/api/v1";

export class PublicApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "PublicApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${API_PREFIX}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string | string[] };
      if (body.message) {
        message = Array.isArray(body.message) ? body.message.join(", ") : body.message;
      }
    } catch {
      /* ignore */
    }
    throw new PublicApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export const publicApi = {
  get<T>(path: string): Promise<T> {
    return request<T>(path);
  },
};
