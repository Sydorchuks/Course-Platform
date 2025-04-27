const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
  retry = true // allow one retry on token refresh
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 401 && retry) {
    // Try refreshing the token
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include', // sends refreshToken cookie
    });

    if (refreshRes.ok) {
      // Retry original request after refresh
      return apiFetch<T>(endpoint, options, false);
    } else {
      throw new Error('Session expired. Please log in again.');
    }
  }

  if (!res.ok) {
    let message = 'Something went wrong';
    try {
      const error = await res.json();
      message = error.message || message;
    } catch (e) {
      console.log("Error " + e)
    }
    throw new Error(message);
  }

  return res.json();
}
