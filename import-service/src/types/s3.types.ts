import { Handler, S3Event } from 'aws-lambda'

export type ValidatedS3Event = Handler<S3Event>
