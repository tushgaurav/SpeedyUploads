import type { Metadata } from "next";
import PageTitle from "@/components/shared/page-title";
import AllFiles from "./_components/all-files";

export const metadata: Metadata = {
    title: "Files | SpeedyUploads",
    description: "View and manage your files",
};

export default function Files() {
    return (
        <div>
            <PageTitle>Files</PageTitle>

            <AllFiles />
        </div>
    )
}