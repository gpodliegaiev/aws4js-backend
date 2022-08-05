import { SQSClient } from '@aws-sdk/client-sqs'
import { region } from 'serverless.constants'

export const sqsClient = new SQSClient({ region })
