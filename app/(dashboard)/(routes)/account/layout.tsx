import { Button } from "@/components/ui/button";
import { Navbar } from ;
import Link from "next/link";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500">
        <Navbar />
        {children}

        <Link href="http://localhost:3000">
            <Button className="mt-4">Back to Course Platform</Button>
      </Link>
    </div>
  )
}

export default ProtectedLayout