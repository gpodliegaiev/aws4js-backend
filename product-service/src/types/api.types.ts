import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda'
import { Product } from './product.types'

type ValidatedAPIGatewayProxyEvent<B> = Omit<APIGatewayProxyEvent, 'body'> & { body: B }
export type ValidatedEventAPIGatewayProxyEvent<B> = Handler<ValidatedAPIGatewayProxyEvent<B>, APIGatewayProxyResult>

export type ResponseData = Product | Product[] | undefined
export type BodyData = ResponseData | { message: string }

export interface ErrorResponse {
  message: string
}
