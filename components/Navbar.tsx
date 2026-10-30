'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Navbar() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <Link href="/" className="shrink-0 text-base font-semibold transition-colors hover:text-gray-600 sm:text-xl">Healthcare Claims</Link>

                <div className="flex shrink-0 items-center gap-3 text-sm sm:gap-6 sm:text-base">
                    {userId && (
                        <Link href={`/claims?userId=${userId}`} className="whitespace-nowrap hover:text-gray-600">Claims</Link>
                    )}

                    {userId && (
                        <Link href="/" className="whitespace-nowrap hover:text-gray-600">Switch User</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
