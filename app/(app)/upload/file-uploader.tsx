"use client"

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, X, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSignedURL } from "./actions";
import { computeSHA256 } from "@/lib/utils";

export default function FileUploader() {
    const [isDragActive, setIsDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            await handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            await handleUpload(selectedFile);
        }
    };

    const handleUpload = async (fileToUpload: File) => {
        setIsUploading(true);
        setUploadProgress(0);
        setStatusMessage("Preparing upload...");

        try {
            // Calculate checksum
            const checksum = await computeSHA256(fileToUpload);
            setStatusMessage("Getting upload URL...");

            // Get signed URL
            const signedUrlResponse = await getSignedURL(
                fileToUpload.name,
                fileToUpload.type,
                fileToUpload.size,
                checksum
            );

            if (signedUrlResponse.failure) {
                throw new Error(signedUrlResponse.failure.message);
            }

            const url = signedUrlResponse.success!.url;
            console.log("PUBLIC URL : ", signedUrlResponse.success!.publicUrl);
            setStatusMessage("Uploading file...");

            // Upload file with progress tracking
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(progress);
                }
            });

            await new Promise((resolve, reject) => {
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(`HTTP Error: ${xhr.status}`));
                    }
                };
                xhr.onerror = () => reject(new Error("Network Error"));

                xhr.open("PUT", url);
                xhr.setRequestHeader("Content-Type", fileToUpload.type);
                xhr.send(fileToUpload);
            });

            setStatusMessage("Upload complete!");
            setUploadProgress(100);
        } catch (error) {
            setStatusMessage(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const resetUpload = () => {
        setFile(null);
        setUploadProgress(0);
        setStatusMessage("");
        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <motion.div
            className="w-full max-w-md rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
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
                <AnimatePresence mode="wait">
                    {!file && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                            <p className="text-gray-600 dark:text-gray-400">
                                Drag and drop your file here, or
                            </p>
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                disabled={isUploading}
                            >
                                Select File
                            </Button>
                        </motion.div>
                    )}

                    {file && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <FileIcon className="h-8 w-8 text-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {file.name}
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <motion.div
                                    className="bg-blue-500 h-2.5 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${uploadProgress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                {uploadProgress === 100 ? (
                                    <div className="flex items-center text-green-500">
                                        <Check className="mr-2" />
                                        <span>Upload Complete</span>
                                    </div>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {statusMessage} {uploadProgress > 0 && `(${uploadProgress}%)`}
                                    </p>
                                )}

                                <Button
                                    onClick={resetUpload}
                                    variant="outline"
                                    disabled={isUploading}
                                    className="mt-2"
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    {isUploading ? "Uploading..." : "Cancel"}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

