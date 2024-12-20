"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import db from "@/lib/db"

const generateFileName = (bytes = 16) => {
    const random = new Uint8Array(bytes)
    crypto.getRandomValues(random)
    return Array.from(random, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

const s3 = new S3Client({
    region: process.env.SP_AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.SP_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.SP_AWS_SECRET_ACCESS_KEY!,
    },
})

const exceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "*"]

const maxFileSize = 1024 * 1024 * 10 // 10MB

export async function getSignedURL(size: number, checksum: string, name?: string | null, type = "*") {
    const session = "hi"
    if (!session) {
        return { failure: { message: "Not authenticated" } }
    }

    if (size > maxFileSize) {
        return { failure: { message: "File too large" } }
    }

    if (!exceptedFileTypes.includes(type) && !exceptedFileTypes.includes("*")) {
        return { failure: { message: "Invalid file type" } }
    }

    const key = name ? `uploads/${name}` : `uploads/${generateFileName()}`
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.SP_AWS_BUCKET_NAME!,
        Key: key,
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: "hi",
        },
    })

    const publicUrl = `https://${process.env.SP_AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`
    const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 90 })

    // Save the file to the database
    await db.file.create({
        data: {
            name: name ?? key,
            url: publicUrl,
            size,
            type
        }
    })


    return { success: { url: signedUrl, publicUrl } }
}