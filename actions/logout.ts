// actions/logout.ts
"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const logout = async () => {
  try {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    // Optionally clear local state, etc.
    revalidatePath("/")
    redirect("/auth/login")
  } catch (error) {
    console.error("Logout error:", error)
  }
}
