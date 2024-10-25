import FileQuickAction from "@/components/file-quickactions"
import FileThumbnail from "@/components/file-thumbnail"
import {
    CardContent,
} from "@/components/ui/card"

import db from "@/lib/db"
import { SpotLightItem } from "./card-stack"

export async function RecentFilesCards() {
    const recentFiles = await db.file.findMany({
        take: 5,
        orderBy: {
            createdAt: "desc",
        },
    })

    console.log(recentFiles)

    return (
        <div className="mt-4">
            <h2 className="font-semibold">Recent Files</h2>
            <div className="
                flex
                flex-wrap
                gap-4
                mt-2
            ">
                {recentFiles.map((file) => (
                    <SpotLightItem key={file.id} className="w-44">
                        <CardContent className="p-2">
                            <FileThumbnail file={file} />
                            <h2 className="text-sm py-2">
                                {
                                    file.name.length > 20
                                        ? file.name.slice(0, 10) + "..."
                                        : file.name
                                }
                            </h2>
                            <FileQuickAction file={file} />
                        </CardContent>

                    </SpotLightItem>
                ))}
            </div>
        </div>
    )
}