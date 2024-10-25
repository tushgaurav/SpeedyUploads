import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-primaryblue text-white py-6 px-4 md:px-6">
            <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <Logo className="" />
                </div>
                <nav className="flex gap-4 md:gap-6 text-sm">
                    <Link href="#" className="hover:text-gray-100" prefetch={false}>
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-gray-100" prefetch={false}>
                        System Status
                    </Link>
                    <Link href="#" className="hover:text-gray-100" prefetch={false}>
                        Report Abuse
                    </Link>
                </nav>
                <p className="text-sm">&copy; {new Date().getFullYear()} <Link href="https://prokits.digital" target="_blank">Prokits Digital</Link>. All rights reserved.</p>
            </div>
        </footer>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link href="/">
            <Image width={120} height={120} src="/images/logo/logo_bg.svg" alt="Acme Inc" className={className} />
        </Link>
    )
}