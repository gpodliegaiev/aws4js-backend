import { S3 } from '@aws-sdk/client-s3'
import { region } from 'serverless.constants'

export const s3Client = new S3({ region })
