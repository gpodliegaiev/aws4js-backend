import { handleResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { productService } from 'src/services/product.service'
import { StatusCodes } from 'src/constants'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'

const getProductById: ValidatedEventAPIGatewayProxyEvent<null> = async event => {
  const {
    pathParameters: { productId },
  } = event

  try {
    const product = await productService.getProductById(productId)

    return handleResponse(product, StatusCodes.NOT_FOUND)
  } catch (error) {
    return handleResponse(null, StatusCodes.SERVER_ERROR, error.message)
  }
}

export const main = middyfy(getProductById)
