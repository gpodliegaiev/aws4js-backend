import { handlerPath } from '@libs/handler-resolver'
import { AWSFunction } from 'src/types'

const functionConfig: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              fileName: true,
            },
          },
        },
        cors: true,
        authorizer: {
          name: 'basicAuthorizer',
          arn: {
            'Fn::Join': [
              ':',
              [
                'arn:aws:lambda',
                { Ref: 'AWS::Region' },
                { Ref: 'AWS::AccountId' },
                'function',
                '${env:AUTH_FUNC_NAME}',
              ],
            ],
          },
          type: 'TOKEN',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
        },
      },
    },
  ],
}

export default functionConfig
