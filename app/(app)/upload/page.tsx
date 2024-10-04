import type { Metadata } from "next";
import Uploader from "./Uploader";

export const metadata: Metadata = {
    title: "Upload Files | Speedy Uploads",
};

export default function UploadPage() {
    return (
        <div>
            <Uploader />
        </div>
    )
}