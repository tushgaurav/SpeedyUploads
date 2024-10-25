import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { redirect } from 'next/navigation'
import { Toaster } from "@/components/ui/sonner"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AutoBreadcrumbs from "./auto-breadcrumb"
import { ModeToggle } from "./ContextMenu"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) {
        redirect('/signin')
    }

    return (
        <SidebarProvider>
            <SessionProvider>
                <AppSidebar />
                <SidebarInset>
                    <main>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center justify-between w-full gap-2 px-4">
                                <div className="flex items-center gap-2">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator orientation="vertical" className="mr-2 h-4" />
                                    <AutoBreadcrumbs />
                                </div>
                                <ModeToggle />
                            </div>
                        </header>
                        <div className="px-6">
                            {children}
                        </div>
                    </main>
                    <Toaster />
                </SidebarInset>
            </SessionProvider>
        </SidebarProvider>
    )
}