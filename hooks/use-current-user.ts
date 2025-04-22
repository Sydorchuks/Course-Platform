"use client"

import { useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  image: string | null
}

interface UseCurrentUserResult {
  user: User | null
  loading: boolean
}

export const useCurrentUser = (): UseCurrentUserResult => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          let res = await fetch("http://localhost:5000/api/users/current", {
            credentials: "include",
          })
  
          if (res.status === 401) {
            console.warn("🔐 Access token expired. Attempting to refresh...")
  
            const refreshRes = await fetch("http://localhost:5000/api/auth/refresh-token", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
  
            if (!refreshRes.ok) {
              console.error("❌ Refresh token request failed with status:", refreshRes.status)
              throw new Error("❌ Failed to refresh token")
            }
  
            console.log("✅ Token refreshed. Fetching user again...")
            res = await fetch("http://localhost:5000/api/users/current", {
              credentials: "include",
            })
          }
  
          if (!res.ok) {
            console.error("❌ Final user fetch failed with status:", res.status)
            throw new Error("❌ Could not fetch current user")
          }
  
          const data = await res.json()
          setUser(data)
        } catch (err) {
          console.error("🔥 Final error in useCurrentUser:", err)
          setUser(null)
        } finally {
          setLoading(false)
        }
      }
  
      fetchUser()
    }, [])
  
    return { user, loading }
  }
  