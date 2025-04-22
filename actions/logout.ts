// logout-client.ts
export const logoutClient = async () => {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    })

    window.location.href = "/login"
  } catch (err) {
    console.error("Logout failed:", err)
    window.location.href = "/login"
  }
}
