import { handlerPath } from '@libs/handler-resolver'
import { AWSFunction } from 'src/types'

const lambdaConfig: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
      },
    },
  ],
}

export default lambdaConfig
