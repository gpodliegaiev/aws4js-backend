import { handleResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { StatusCodes } from 'src/constants'
import { productService } from 'src/services/product.service'
import type { ID, CreateProductData, ValidatedEventAPIGatewayProxyEvent } from 'src/types'

const createProduct: ValidatedEventAPIGatewayProxyEvent<CreateProductData> = async event => {
  try {
    const id = await productService.createProduct(event.body)

    return handleResponse<ID>({ id })
  } catch (error) {
    return handleResponse(null, StatusCodes.SERVER_ERROR, error.message)
  }
}

export const main = middyfy(createProduct)
