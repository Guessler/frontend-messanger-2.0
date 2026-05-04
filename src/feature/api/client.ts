let csrfToken: string | null = null;

export const getCsrfToken = async () => {
  if (csrfToken) return csrfToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACK}auth/csrf-token`,
    {
      credentials: 'include',
    }
  );

  const data = await res.json();
  csrfToken = data.csrfToken;

  return csrfToken;
};

export const apiFetch = async (input: RequestInfo, init?: RequestInit) => {
  const token = await getCsrfToken();

  return fetch(input, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token!,
      ...(init?.headers || {}),
    },
  });
};
