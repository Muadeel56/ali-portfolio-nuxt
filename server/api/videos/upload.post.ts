// Requires: npm install @aws-sdk/client-s3
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const formData = await readFormData(event)
  const file = formData.get('file') as File

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided.' })
  }

  const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm']
  if (!allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file type. Only MP4, MOV, and WebM are accepted.' })
  }

  const maxSize = 500 * 1024 * 1024 // 500 MB
  if (file.size > maxSize) {
    throw createError({ statusCode: 400, statusMessage: 'File too large. Maximum size is 500 MB.' })
  }

  const client = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  })

  const ext = file.name.split('.').pop()
  const key = `ali-portfolio-assets/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await client.send(
    new PutObjectCommand({
      Bucket: config.awsS3Bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }),
  )

  const url = `https://${config.awsS3Bucket}.s3.${config.awsRegion}.amazonaws.com/${key}`

  return { success: true, url, key }
})
