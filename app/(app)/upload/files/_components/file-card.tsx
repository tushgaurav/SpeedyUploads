"use client"

import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { File } from "@prisma/client"
import { cn, getSizeFormatted } from "@/lib/utils"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function FileCard({ file, className, key }: { file: File, className?: string, key?: string }) {
    const size = getSizeFormatted(file.size)
    const isImage = file.type.startsWith("image")
    const name = file.name.length > 10 ? file.name.substring(0, 20) + "..." : file.name

    const handleUrlCopy = () => {
        navigator.clipboard.writeText(file.url)
    }

    return (
        <ContextMenu key={key}>
            <ContextMenuTrigger className={cn(
                "light:bg-gray-50 dark:bg-gray-800",
                "rounded",
                "p-2",
                "min-h-44 min-w-44",
                className
            )}>
                <Sheet >
                    <SheetTrigger>


                        <ContextMenuContent>
                            <ContextMenuItem onClick={handleUrlCopy}>Copy Public URL</ContextMenuItem>
                            <ContextMenuItem>Open</ContextMenuItem>
                            <ContextMenuItem>View Stats</ContextMenuItem>
                        </ContextMenuContent>

                        <CardContent className="p-1">
                            <div className="flex flex-col justify-between">
                                <div>
                                    {isImage ? (
                                        <img
                                            className={cn(
                                                "rounded",
                                                "object-cover",
                                                "w-full",
                                                "h-32",
                                            )}
                                            src={file.url}
                                            alt={file.name} />
                                    ) : (
                                        <div
                                            className={cn(
                                                "rounded-md",
                                                "bg-gray-200 dark:bg-gray-800 dark:text-gray-200",
                                                "w-full",
                                                "h-32",
                                            )}
                                        >
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-gray-500">File</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h2 className="text-sm font-semibold mt-2">{name}</h2>
                                            <p className="text-sm text-gray-500">{file.type}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-500">{size}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </SheetTrigger>

                    {/* File Info */}
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                {file.name}
                            </SheetTitle>
                            <SheetDescription>
                                {file.type}
                                {size}
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </ContextMenuTrigger>
        </ContextMenu>
    )
}