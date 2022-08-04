import { SQSHandler } from 'aws-lambda'
import { middyfy } from '@libs/lambda'
import { productService } from 'src/services/product.service'

const catalogBatchProcess: SQSHandler = async event => {
  try {
    const products = event.Records.map(record => JSON.parse(record.body))

    for (const product of products) {
      const id = await productService.createProduct(product)
      console.log('Product added: ', id)
    }
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

export const main = middyfy(catalogBatchProcess)
