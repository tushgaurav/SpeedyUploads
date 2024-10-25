"use client"

import { toast } from "sonner"
import { cn } from "@/lib/utils";
import { Link, Eye } from "lucide-react";
import { File } from "@prisma/client";

function ActionButton({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
    return (
        <button onClick={onClick} className={cn("text-gray-300", "hover:text-gray-400 active:text-blue-800")}>
            {children}
        </button>
    )
}

export default function FileQuickAction({ file, className }: { file: File, className?: string }) {
    const copyLink = () => {
        navigator.clipboard.writeText(file.url)
        toast("Link copied to clipboard.")

    }

    return (
        <div className={cn("flex", "items-center", "justify-end gap-2", className)}>
            <ActionButton onClick={copyLink}>
                <Link size={16} />
            </ActionButton>
            <ActionButton onClick={() => { }}>
                <Eye size={16} />
            </ActionButton>
        </div>
    )
}