import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { handleResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import products from '../../../mocks/products.json'

const getProductsList: ValidatedEventAPIGatewayProxyEvent<null> = async event => {
  return handleResponse(products)
}

export const main = middyfy(getProductsList)
