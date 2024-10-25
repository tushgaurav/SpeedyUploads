"use client"
import { signOut } from "next-auth/react"

export function SignOut({ className, children }: { className?: string, children: React.ReactNode }) {
    return <button className={className} onClick={() => signOut()}>
        {children}
    </button>
}