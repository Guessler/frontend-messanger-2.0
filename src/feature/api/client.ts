let csrfToken: string | null = null;

const BASE_URL = process.env.NEXT_PUBLIC_API_BACK;

// -- CSRF --

export const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) return csrfToken;

  const res = await fetch(`${BASE_URL}auth/csrf-token`, {
    credentials: 'include',
  });

  const data = await res.json();
  csrfToken = data.csrfToken;

  return csrfToken!;
};

// -- Refresh --

const refreshAccessToken = async (): Promise<boolean> => {
  const token = await getCsrfToken();

  return fetch(`${BASE_URL}auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
    },
  }).then((res) => res.ok);
};
// -- Core fetch --

export const apiFetch = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const token = await getCsrfToken();

  const buildInit = (i?: RequestInit): RequestInit => ({
    ...i,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
      ...(i?.headers ?? {}),
    },
  });

  const res = await fetch(input, buildInit(init));

  if (res.status !== 401) return res;

  // Access token истёк — пробуем обновить тихо, один раз
  const refreshed = await refreshAccessToken();

  if (!refreshed) return res; // refresh тоже не прошёл — вернуть 401 вызывающему

  return fetch(input, buildInit(init)); // повторяем исходный запрос
};