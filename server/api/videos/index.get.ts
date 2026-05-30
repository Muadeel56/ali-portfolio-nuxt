// Requires: npm install @aws-sdk/client-s3
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const client = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  })

  const command = new ListObjectsV2Command({
    Bucket: config.awsS3Bucket,
    Prefix: 'ali-portfolio-assets/',
  })

  const response = await client.send(command)
  const baseUrl = `https://${config.awsS3Bucket}.s3.${config.awsRegion}.amazonaws.com`

  const videos = (response.Contents ?? [])
    .filter((obj) => obj.Key?.match(/\.(mp4|mov|webm)$/i))
    .map((obj) => ({
      key: obj.Key,
      url: `${baseUrl}/${obj.Key}`,
      size: obj.Size,
      lastModified: obj.LastModified,
    }))

  return videos
})
