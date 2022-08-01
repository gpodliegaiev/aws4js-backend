import schema from './schema'
import { handlerPath } from '@libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        bodyType: 'CreateProductData',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        responseData: {
          200: {
            bodyType: 'ID',
          },
          400: {
            bodyType: 'ErrorResponse',
          },
          500: {
            bodyType: 'ErrorResponse',
          },
        },
      },
    },
  ],
}
