import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const formData = await readFormData(event)

  const file = formData.get('file') as File
  const title = (formData.get('title') as string) ?? ''
  const caption = (formData.get('caption') as string) ?? ''
  const description = (formData.get('description') as string) ?? ''

  if (!file) throw createError({ statusCode: 400, statusMessage: 'No file provided.' })

  const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm']
  if (!allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file type. Only MP4, MOV, and WebM are accepted.' })
  }

  if (file.size > 500 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: 'File too large. Maximum size is 500 MB.' })
  }

  const client = new S3Client({
    region: config.awsRegion as string,
    credentials: {
      accessKeyId: config.awsAccessKeyId as string,
      secretAccessKey: config.awsSecretAccessKey as string,
    },
  })

  const key = `ali-portfolio-assets/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await client.send(new PutObjectCommand({
    Bucket: config.awsS3Bucket as string,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  }))

  const url = `https://${config.awsS3Bucket}.s3.${config.awsRegion}.amazonaws.com/${key}`

  const sql = getDb()
  const [video] = await sql`
    INSERT INTO videos (key, url, title, caption, description, size)
    VALUES (${key}, ${url}, ${title}, ${caption}, ${description}, ${file.size})
    RETURNING *
  `
  return { success: true, video }
})
