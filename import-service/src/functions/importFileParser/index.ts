import { handlerPath } from '@libs/handler-resolver'
import { bucketName } from 'serverless.constants'
import { AWSFunction } from 'src/types'

const functionConfig: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: bucketName,
        existing: true,
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/',
          },
        ],
      },
    },
  ],
}

export default functionConfig
