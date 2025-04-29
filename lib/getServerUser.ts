import { cookies } from "next/headers";



export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch('http://localhost:5000/api/users/current', {
      credentials: 'include',
      headers: {
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};