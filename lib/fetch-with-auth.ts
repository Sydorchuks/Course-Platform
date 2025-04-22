export const fetchWithAuth = async (
    input: RequestInfo,
    init?: RequestInit,
    retry = true
  ): Promise<Response> => {
    console.log("⏳ Request to:", input)
  
    const res = await fetch(input, {
      ...init,
      credentials: "include",
    })
  
    if (res.status === 401 && retry) {
      console.log("🔐 Access token expired. Trying to refresh...")
  
      const refreshRes = await fetch("http://localhost:5000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      })
  
      if (refreshRes.ok) {
        console.log("✅ Token refreshed. Retrying original request.")
        return fetchWithAuth(input, init, false)
      } else {
        console.error("❌ Failed to refresh token", refreshRes.status)
        return res
      }
    }
  
    console.log("✅ Response from", input, res.status)
    return res
  }
  