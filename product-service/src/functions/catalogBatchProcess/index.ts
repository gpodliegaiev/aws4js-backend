import { handlerPath } from '@libs/handler-resolver'
import { AWSFunction } from 'src/types'

const catalogBatchProcessConfig: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::Join': [':', ['arn:aws:sqs', { Ref: 'AWS::Region' }, { Ref: 'AWS::AccountId' }, '${env:SQS_NAME}']],
        },
        batchSize: 5,
        enabled: true,
      },
    },
  ],
}

export default catalogBatchProcessConfig
