import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-blue-100 dark:bg-neutral-900 text-black dark:text-white">
            <Navbar />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </main>
    )
}