"use client"
import * as React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

export default function AutoBreadcrumbs() {
    const pathname = usePathname()

    const pathParts = pathname.split('/').filter(Boolean)
    const path = pathParts.map((part, index) => {
        const url = '/' + pathParts.slice(0, index + 1).join('/')
        return { part, url }
    })

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/home">
                        App
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {path.length === 1 && path[0].part === 'home' ? null : (
                    <BreadcrumbSeparator />
                )}
                {
                    path.length === 1 && path[0].part === 'home' ? null : (
                        <BreadcrumbItem>
                            {path.map(({ part, url }, index) => (
                                <React.Fragment key={part}>
                                    <BreadcrumbLink href
                                        ={url}>
                                        {part.charAt(0).toUpperCase() + part.slice(1)}
                                    </BreadcrumbLink>
                                    {index < path.length - 1 && <BreadcrumbSeparator />}
                                </React.Fragment>
                            ))}

                        </BreadcrumbItem>
                    )
                }

            </BreadcrumbList>
        </Breadcrumb>
    )
}