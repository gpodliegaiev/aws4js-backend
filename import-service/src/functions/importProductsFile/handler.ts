import { handleResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { StatusCodes } from 'src/constants'
import type { ValidatedEventAPIGatewayProxyEvent } from 'src/types'

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<null> = async event => {
  const { queryStringParameters } = event
  try {
    return handleResponse(queryStringParameters, StatusCodes.NOT_FOUND)
  } catch (error) {
    return handleResponse(null, StatusCodes.SERVER_ERROR, error.message)
  }
}

export const main = middyfy(importProductsFile)
