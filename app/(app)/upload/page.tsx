import type { Metadata } from "next";
import FileUploader from "./file-uploader";
import PageTitle from "@/components/shared/page-title";

export const metadata: Metadata = {
    title: "Upload Files | Speedy Uploads",
};

export default function UploadPage() {
    return (
        <div>
            <PageTitle>Upload Files</PageTitle>
            <FileUploader />
        </div>
    )
}