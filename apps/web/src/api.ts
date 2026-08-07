const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export type Me = {
  id: string;
  email: string;
  createdAt: string;
};

export type Application = {
  id: string;
  company: string;
  title: string;
  status: string;
  createdAt: string;
};

type ApiError = { error?: string };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include', // Hotspot: must send HttpOnly cookie
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (body as ApiError).error ?? `Request failed (${response.status})`;
    throw new Error(message);
  }

  return body as T;
}

export const api = {
  register: (email: string, password: string) =>
    request<Me>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    request<Me>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<void>('/api/auth/logout', { method: 'POST' }),
  me: () => request<Me>('/api/auth/me'),
  listApplications: () => request<Application[]>('/api/applications'),
  createApplication: (company: string, title: string) =>
    request<Application>('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ company, title }),
    }),
};
