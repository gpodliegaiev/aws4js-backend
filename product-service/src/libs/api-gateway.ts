import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

type ValidatedAPIGatewayProxyEvent<B> = Omit<APIGatewayProxyEvent, 'body'> & { body: B }
export type ValidatedEventAPIGatewayProxyEvent<B> = Handler<ValidatedAPIGatewayProxyEvent<B>, APIGatewayProxyResult>

type ResponseItem = Record<string, unknown>
type Response = ResponseItem | ResponseItem[] | undefined

export const handleResponse = (response: Response) => {
  let statusCode = StatusCodes.OK
  let bodyData = response

  if (!response) {
    statusCode = StatusCodes.NOT_FOUND
    bodyData = {
      message: getReasonPhrase(statusCode),
    }
  }

  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify(bodyData),
  }
}
