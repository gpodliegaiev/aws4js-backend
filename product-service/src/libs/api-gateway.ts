import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { defaultHeaders, ResponseMessages, StatusCodes } from 'src/constants'
import { Product } from 'src/types/product.types'

type ValidatedAPIGatewayProxyEvent<B> = Omit<APIGatewayProxyEvent, 'body'> & { body: B }
export type ValidatedEventAPIGatewayProxyEvent<B> = Handler<ValidatedAPIGatewayProxyEvent<B>, APIGatewayProxyResult>

type ResponseData = Product | Product[] | undefined
type BodyData = ResponseData | { message: string }

export const handleResponse = (responseData: ResponseData, httpStatusCode?: StatusCodes, message?: string) => {
  let statusCode = StatusCodes.OK
  let bodyData: BodyData = responseData

  if (!responseData) {
    statusCode = httpStatusCode || StatusCodes.NOT_FOUND
    bodyData = {
      message: message || ResponseMessages[statusCode],
    }
  }

  return {
    statusCode,
    headers: defaultHeaders,
    body: JSON.stringify(bodyData),
  }
}
