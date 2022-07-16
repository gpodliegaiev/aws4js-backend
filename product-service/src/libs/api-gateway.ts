import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { ResponseMessages, StatusCodes } from 'src/constants'
import { Product } from 'src/types'

type ValidatedAPIGatewayProxyEvent<B> = Omit<APIGatewayProxyEvent, 'body'> & { body: B }
export type ValidatedEventAPIGatewayProxyEvent<B> = Handler<ValidatedAPIGatewayProxyEvent<B>, APIGatewayProxyResult>

type ResponseData = Product | Product[] | undefined
type BodyData = ResponseData | { message: string }

export const handleResponse = (responseData: ResponseData) => {
  let statusCode = StatusCodes.OK
  let bodyData: BodyData = responseData

  if (!responseData) {
    statusCode = StatusCodes.NOT_FOUND
    bodyData = {
      message: ResponseMessages[statusCode],
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
