import { cn } from "@/lib/utils";
import { File } from "@prisma/client";

export default function FileThumbnail({ file, className }: { file: File, className?: string }) {
    const isImage = file.type.startsWith("image")
    console.log(isImage)

    switch (isImage) {
        case true:
            return <img
                className={
                    cn(
                        "rounded-md",
                        "object-cover",
                        "w-full",
                        "h-32",
                        className
                    )
                }
                src={file.url}
                alt={file.name} />
            break;
        case false:
            return <div
                className={cn(
                    "rounded-md",
                    "bg-gray-200 dark:bg-gray-800 dark:text-gray-200",
                    "w-full",
                    "h-32",
                    className
                )}
            >
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">File</p>
                </div>
            </div>
            break;
    }
}