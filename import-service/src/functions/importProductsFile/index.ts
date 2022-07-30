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
      },
    },
  ],
}

export default functionConfig
