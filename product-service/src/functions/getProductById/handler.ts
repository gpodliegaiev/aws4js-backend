import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { handleResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import products from '../../../mocks/products.json'

const getProductById: ValidatedEventAPIGatewayProxyEvent<null> = async event => {
  const {
    pathParameters: { productId },
  } = event

  const product = products.find(({ id }) => id === productId)

  return handleResponse(product)
}

export const main = middyfy(getProductById)
