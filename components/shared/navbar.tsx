import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 bg-primaryblue text-white relative z-20">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Home
                        </Link>
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Services
                        </Link>
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Contact
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                    <Image src="/images/logo/logo_bg.svg" alt="Logo" width={120} height={50} />
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    <Link
                        href="/"
                        prefetch={false}
                        className="font-semibold text-sm text-blue-100 hover:text-gray-100"
                    >
                        Home
                    </Link>
                    <Link
                        href="/home"
                        prefetch={false}
                        className="font-semibold text-sm text-blue-100 hover:text-gray-100"
                    >
                        App
                    </Link>
                    <Link
                        href="#"
                        prefetch={false}
                        className="font-semibold text-sm text-blue-100 hover:text-gray-100"
                    >
                        Services
                    </Link>
                    <Link
                        href="#"
                        prefetch={false}
                        className="font-semibold text-sm text-blue-100 hover:text-gray-100"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    )
}

function MenuIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

