import { handleResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { StatusCodes } from 'src/constants'
import { productService } from 'src/services/product.service'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'

const getProductsList: ValidatedEventAPIGatewayProxyEvent<null> = async _event => {
  try {
    const products = await productService.getAllProducts()

    return handleResponse(products)
  } catch (error) {
    return handleResponse(null, StatusCodes.SERVER_ERROR, error.message)
  }
}

export const main = middyfy(getProductsList)
