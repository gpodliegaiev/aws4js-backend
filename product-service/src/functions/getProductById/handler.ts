import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { handleResponse } from '@libs/api-gateway'
import { getMocksAsync } from '@libs/get-mocks-async'
import { middyfy } from '@libs/lambda'

const getProductById: ValidatedEventAPIGatewayProxyEvent<null> = async event => {
  const {
    pathParameters: { productId },
  } = event

  const products = await getMocksAsync()

  const product = products.find(({ id }) => id === productId)

  return handleResponse(product)
}

export const main = middyfy(getProductById)
