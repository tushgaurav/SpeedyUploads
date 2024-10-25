import { Card, CardContent } from "@/components/ui/card"
import { File } from "@prisma/client"
import db from "@/lib/db"
import { cn, getSizeFormatted } from "@/lib/utils"

function FileCard({ file, className, key }: { file: File, className?: string, key?: string }) {
    const size = getSizeFormatted(file.size)
    const isImage = file.type.startsWith("image")
    const name = file.name.length > 10 ? file.name.substring(0, 20) + "..." : file.name

    return (
        <Card key={key} className={cn(
            "light:bg-gray-50 dark:bg-gray-800",
            "rounded",
            "p-2",
            "min-h-44 min-w-44",
            className
        )}>
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
        </Card>
    )
}

export default async function FileExplorer() {
    const files = await db.file.findMany(
        {
            orderBy: {
                createdAt: "desc"
            }
        }
    )

    return (
        <div>
            <div className="w-full h-full rounded py-4 mb-4">
                <div className="flex flex-wrap items-start gap-2">
                    {
                        files.map((files) => (
                            <FileCard key={files.id} file={files} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}