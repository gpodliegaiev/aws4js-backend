import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

type ValidatedAPIGatewayProxyEvent<B> = Omit<APIGatewayProxyEvent, 'body'> & { body: B }
export type ValidatedEventAPIGatewayProxyEvent<B> = Handler<ValidatedAPIGatewayProxyEvent<B>, APIGatewayProxyResult>

type ResponseItem = Record<string, unknown>
type Response = ResponseItem | ResponseItem[]

export const formatJSONResponse = (response: Response) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
