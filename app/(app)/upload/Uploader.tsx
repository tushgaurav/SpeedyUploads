"use client"

import { useState } from "react"
import { getSignedURL } from "./actions"

export default function Uploader() {
    const [file, setFile] = useState<File | undefined>()
    const [fileUrl, setFileUrl] = useState<string | undefined>()
    const [statusMessage, setStatusMessage] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(false)

    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer()
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("")
        return hashHex
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFile(file)

        if (fileUrl) {
            URL.revokeObjectURL(fileUrl)
        }

        if (file) {
            const url = URL.createObjectURL(file)
            setFileUrl(url)
        } else {
            setFileUrl(undefined)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        try {
            if (file) {
                setStatusMessage("Uploading...")
                const checksum = await computeSHA256(file)
                const signedUrl = await getSignedURL(file.type, file.size, checksum)
                if (signedUrl.failure !== undefined) {
                    setStatusMessage("Failed to get signed URL")
                    console.error("error")
                    setStatusMessage(signedUrl.failure.message)
                    return
                }
                const url = signedUrl.success!.url;

                await fetch(url, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type,
                    },
                })
            }
        } catch (e) {
            setStatusMessage("Failed to upload")
            console.error(e)
        } finally {
            setLoading(false)
        }

        setStatusMessage("Uploaded!")
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">Upload</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Upload your files here
                    </p>
                    {fileUrl && file && (
                        <img src={fileUrl} alt={file.name} className="w-full h-96 object-cover rounded-lg" />
                    )}
                    {statusMessage && (
                        <div className="text-lg font-semibold">
                            {statusMessage}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="file" className="text-lg font-semibold">
                                Choose a file
                            </label>
                            <input type="file" id="file" onChange={handleChange} accept="image/*" />
                            <input type="submit" value="Submit" />
                            <button className="btn btn-primary">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}