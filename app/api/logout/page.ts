// app/api/logout/route.ts
import { NextResponse } from "next/server"

const isProd = process.env.NODE_ENV === "production"

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" })

  res.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: isProd,
    expires: new Date(0),
    path: "/",
  })

  res.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: isProd,
    expires: new Date(0),
    path: "/",
  })

  return res
}

// Optional:
export async function GET() {
  return POST()
}
