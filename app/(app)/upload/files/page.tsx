import PageTitle from "@/components/shared/page-title";
import type { Metadata } from "next";
import FileExplorer from "./file-explorer";

export const metadata: Metadata = {
    title: "All Files",
    description: "Files",
};

export default function Files() {
    return (
        <div>
            <PageTitle>Files</PageTitle>

            <FileExplorer />
        </div>
    )
}