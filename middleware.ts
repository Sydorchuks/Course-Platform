import { NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the user is requesting a public route
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route))

  // Check if the access token cookie is present
  const accessToken = request.cookies.get("accessToken")?.value

  // If the route is protected and there's no token → redirect to login
  if (!isPublic && !accessToken) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Allow request through
  return NextResponse.next()
}


export const config = {
  matcher: [
    "/",            // root
    "/profile",     // profile
    "/admin",       // admin
    "/login",       // login
    "/register",    // register
    "/((?!api|_next|static|favicon.ico).*)" // skip Next internals & API
  ],
}