"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const generateFileName = (bytes = 16) => {
    const random = new Uint8Array(bytes)
    crypto.getRandomValues(random)
    return Array.from(random, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

const exceptedFileTypes = ["image/jpeg", "image/png", "image/gif"]

const maxFileSize = 1024 * 1024 * 10 // 10MB

export async function getSignedURL(type = "*", size: number, checksum: string) {
    const session = "hi"
    if (!session) {
        return { failure: { message: "Not authenticated" } }
    }

    if (size > maxFileSize) {
        return { failure: { message: "File too large" } }
    }

    if (!exceptedFileTypes.includes(type)) {
        return { failure: { message: "Invalid file type" } }
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `uploads/${generateFileName()}`,
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: "hi",
        },
    })

    const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 90 })
    return { success: { url: signedUrl } }
}