const CSRF_KEY = 'csrf_token';

let isRefreshing = false;

let waitQueue: Array<{
  resolve: () => void;
  reject: (err: unknown) => void;
}> = [];

const flushQueue = (error?: unknown) => {
  waitQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  waitQueue = [];
};

export const getCsrfToken = async (): Promise<string> => {
  const cached = sessionStorage.getItem(CSRF_KEY);

  if (cached) {
    return cached;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACK}auth/csrf-token`,
    {
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Не удалось получить CSRF токен');
  }

  const data = await res.json();

  const token: string = data.csrfToken;

  sessionStorage.setItem(CSRF_KEY, token);

  return token;
};

const refreshAccessToken = async (): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACK}auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Refresh failed');
    }

    await res.json();

    await new Promise((resolve) => setTimeout(resolve, 50));
  } catch (err) {
    throw err;
  }
};

export const apiFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const csrfToken = await getCsrfToken();

  const makeRequest = async (): Promise<Response> => {
    return fetch(input, {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        ...(init?.headers ?? {}),
      },
    });
  };

  let response = await makeRequest();

  if (response.status !== 401) {
    return response;
  }

  const url =
    typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.href
        : input.url;

  if (url.includes('/auth/refresh')) {
    sessionStorage.removeItem(CSRF_KEY);

    window.location.href = '/login';

    throw new Error('Refresh token expired');
  }

  if (isRefreshing) {
    return new Promise<Response>((resolve, reject) => {
      waitQueue.push({
        resolve: async () => {
          try {
            const retryResponse = await makeRequest();
            resolve(retryResponse);
          } catch (err) {
            reject(err);
          }
        },
        reject,
      });
    });
  }

  isRefreshing = true;

  try {
    await refreshAccessToken();

    flushQueue();

    response = await makeRequest();

    return response;
  } catch (err) {
    flushQueue(err);

    sessionStorage.removeItem(CSRF_KEY);

    window.location.href = '/login';

    throw err;
  } finally {
    isRefreshing = false;
  }
};