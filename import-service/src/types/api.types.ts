import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda'

type ValidatedAPIGatewayProxyEvent<B> = Omit<APIGatewayProxyEvent, 'body'> & { body: B }
export type ValidatedEventAPIGatewayProxyEvent<B> = Handler<ValidatedAPIGatewayProxyEvent<B>, APIGatewayProxyResult>

export type ResponseData = any | undefined
export type BodyData = ResponseData | { message: string }

export interface ErrorResponse {
  message: string
}
