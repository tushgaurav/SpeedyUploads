"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Check, X, FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSignedURL } from "./actions"
import { computeSHA256 } from "@/lib/utils"

export default function FileUploader() {
    const [isDragActive, setIsDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [fileUrl, setFileUrl] = useState<string | undefined>()
    const [statusMessage, setStatusMessage] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragActive(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragActive(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
            simulateUpload()
        }
    }

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setFile(e.target.files[0])
    //         simulateUpload()
    //     }
    // }

    const simulateUpload = () => {
        setUploadProgress(0)
        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prevProgress + 10
            })
        }, 500)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const resetUpload = () => {
        setFile(null)
        setUploadProgress(0)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <motion.div
            className="w-full max-w-md rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragActive
                    ? "border-primaryblue bg-blue-50 dark:bg-blue-900"
                    : "border-gray-300 dark:border-gray-600"
                    }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                <AnimatePresence>
                    {!file && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                Drag and drop your file here, or
                            </p>
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                className="mt-2"
                            >
                                Select File
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {file && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-4"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <FileIcon className="h-8 w-8 text-blue-500 mr-2" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {file.name}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                                <motion.div
                                    className="bg-blue-500 h-2.5 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            {uploadProgress === 100 ? (
                                <div className="flex items-center justify-center text-green-500">
                                    <Check className="mr-2" />
                                    <span>Upload Complete</span>
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                    Uploading... {uploadProgress}%
                                </p>
                            )}
                            <Button
                                onClick={resetUpload}
                                variant="outline"
                                className="mt-4"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}