// logout-client.ts
export const logoutClient = async () => {
  const response = await fetch('http://localhost:5000/api/auth/logout', {
    method: 'POST',
    credentials: 'include', // Ensure cookies are sent with the request
  });

  if (response.ok) {
    // Redirect to login page after logout
    window.location.href = '/login'; // Or use router.push('/login') if you're using a client-side router
  } else {
    console.error('Logout failed');
  }
}
