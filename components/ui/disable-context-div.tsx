"use client"

export default function DisableContextDiv({ children, className, ...props }:
    {
        children: React.ReactNode,
        className?: string,
        props?: React.HTMLAttributes<HTMLDivElement>
    }) {

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div className={className} onContextMenu={handleContextMenu} {...props}>
            {children}
        </div>
    )
}