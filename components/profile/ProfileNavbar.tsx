"use client"
import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"


export const Navbar = () => {

    const pathname = usePathname()
    const {data: session} = useSession()
    const userRole = session?.user?.role

    return (
        <nav className="bg-white flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">

                {userRole === UserRole.ADMIN && (
                    <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
                        <Link href="/server">
                            Server
                        </Link>
                    </Button>
                )}

                <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
                    <Link href="/client">
                        Client
                    </Link>
                </Button>
                
                {userRole === UserRole.ADMIN && (
                    <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
                        <Link href="/admin">Admin</Link>
                    </Button>
                )}

                <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href="/settings">
                        Settings
                    </Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    )
}