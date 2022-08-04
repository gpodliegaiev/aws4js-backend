import { handlerPath } from '@libs/handler-resolver'
import { AwsLambdaRole } from '@serverless/typescript'
import { AWSFunction } from 'src/types'

const catalogBatchProcessConfig: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {
    statements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: `arn:aws:sqs:::${'------------------------'}`,
      },
    ],
  } as unknown as AwsLambdaRole,
  events: [
    {
      sqs: {
        arn: '----------------------------',
        batchSize: 5,
      },
    },
  ],
}

export default catalogBatchProcessConfig
