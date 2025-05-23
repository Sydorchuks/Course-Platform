
"use client";

import { usePathname} from "next/navigation";
import {Button} from "@/components/ui/button"
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./Search-input";
import { UserButton } from "./profile/user-button";

export const NavbarRoutes = () =>{

    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.startsWith("/courses");
    const isSearchPage = pathname === "/search"

    return (
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isCoursePage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher Mode
                    </Button>
                </Link>
            )}
            
            <UserButton/>

        </div>


        </>
    )
}