import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { handleResponse } from '@libs/api-gateway'
import { getMocksAsync } from '@libs/get-mocks-async'
import { middyfy } from '@libs/lambda'

const getProductsList: ValidatedEventAPIGatewayProxyEvent<null> = async _event => {
  const products = await getMocksAsync()

  return handleResponse(products)
}

export const main = middyfy(getProductsList)
