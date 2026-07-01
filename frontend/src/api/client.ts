const BASE_URL = import.meta.env.VITE_APP_URL;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<TResponse>(
  path: string,
  options: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // response had no JSON body — keep default message
    }
    throw new ApiError(message, response.status);
  }

  // Handle empty responses gracefully
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as TResponse;
}

export const apiClient = {
  get: <TResponse>(path: string) => request<TResponse>(path, { method: "GET" }),
  post: <TResponse, TBody = unknown>(path: string, body: TBody) =>
    request<TResponse>(path, { method: "POST", body: JSON.stringify(body) }),
};
