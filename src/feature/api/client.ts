const CSRF_KEY = 'csrf_token';

export const getCsrfToken = async (): Promise<string> => {
  // 1. Берём из sessionStorage если есть
  const cached = sessionStorage.getItem(CSRF_KEY);
  if (cached) return cached;

  // 2. Иначе запрашиваем один раз
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACK}auth/csrf-token`,
    { credentials: 'include' }
  );

  if (!res.ok) throw new Error('Не удалось получить CSRF токен');

  const data = await res.json();
  const token: string = data.csrfToken;

  sessionStorage.setItem(CSRF_KEY, token);

  return token;
};

export const apiFetch = async (input: RequestInfo, init?: RequestInit) => {
  const token = await getCsrfToken();

  return fetch(input, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
      ...(init?.headers ?? {}),
    },
  });
};