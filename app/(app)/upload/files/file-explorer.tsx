import db from "@/lib/db"
import FileCard from "./_components/file-card"
import DisableContextDiv from "@/components/ui/disable-context-div"

export default async function FileExplorer() {
    const files = await db.file.findMany(
        {
            orderBy: {
                createdAt: "desc"
            }
        }
    )

    return (
        <DisableContextDiv>
            <div className="w-full h-full rounded py-4 mb-4">
                <div className="flex flex-wrap items-start gap-2">
                    {
                        files.map((files) => (
                            <FileCard key={files.id} file={files} />
                        ))
                    }
                </div>
            </div>
        </DisableContextDiv>
    )
}