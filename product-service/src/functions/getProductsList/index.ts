import { handlerPath } from '@libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        responseData: {
          200: {
            bodyType: 'ProductList',
          },
          500: {
            bodyType: 'ErrorResponse',
          },
        },
      },
    },
  ],
}
