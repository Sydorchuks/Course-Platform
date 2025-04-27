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
  error: string | null
}

export const useCurrentUser = (): UseCurrentUserResult => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // Add an error state

  useEffect(() => {
    const controller = new AbortController()
  
    const fetchUser = async () => {
      try {
        let res = await fetch("http://localhost:5000/api/users/current", {
          credentials: "include",
          signal: controller.signal,
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
            setError("Failed to refresh token. Please log in again.")
            setUser(null)
            setLoading(false)
            return // ✅ Just return early
          }
        
          console.log("✅ Token refreshed. Fetching user again...")
          res = await fetch("http://localhost:5000/api/users/current", {
            credentials: "include",
          })
        }
  
        if (!res.ok) {
          console.error("❌ Final user fetch failed with status:", res.status)
          setError("Could not fetch user data. Please try again later.")
          throw new Error("❌ Could not fetch current user")
        }
  
        const data = await res.json()
        setUser(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('🛑 Fetch aborted')
        } else {
          console.error("🔥 Final error in useCurrentUser:", err)
          setError("An error occurred. Please try again later.")
          setUser(null)
        }
      } finally {
        setLoading(false)
      }
    }
  
    fetchUser()
  
    return () => {
      controller.abort() // ✅ Properly cancels fetch on unmount
    }
  }, [])

  return { user, loading, error }
}
