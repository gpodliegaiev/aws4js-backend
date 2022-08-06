import { SQSHandler } from 'aws-lambda'
import { PublishCommand, PublishCommandInput } from '@aws-sdk/client-sns'
import { middyfy } from '@libs/lambda'
import { productService } from 'src/services/product.service'
import { snsClient } from 'src/snsClient'
import { CreateProductData } from 'src/types'

const generateCommandOptions = (productsIds: string[], inStock?: boolean): PublishCommandInput => {
  return {
    TopicArn: process.env.SNS_ARN,
    Subject: `Products ${inStock ? 'in' : 'out of'} stock were created`,
    Message: `Created products ids: ${JSON.stringify(productsIds)}`,
    MessageAttributes: {
      inStock: {
        DataType: 'Number',
        StringValue: inStock ? '1' : '0',
      },
    },
  }
}

const catalogBatchProcess: SQSHandler = async event => {
  try {
    const products: CreateProductData[] = event.Records.map(record => JSON.parse(record.body))
    const inStock = []
    const outOfStock = []

    for (const product of products) {
      const id = await productService.createProduct(product)

      if (Number(product.count)) {
        inStock.push(id)
      } else {
        outOfStock.push(id)
      }

      console.log('Product added: ', JSON.stringify({ ...product, id }))
    }

    if (inStock.length) {
      const commandOptions: PublishCommandInput = generateCommandOptions(inStock, true)
      await snsClient.send(new PublishCommand(commandOptions))
      console.log('inStock SNS was sent')
    }

    if (outOfStock.length) {
      const commandOptions: PublishCommandInput = generateCommandOptions(outOfStock)
      await snsClient.send(new PublishCommand(commandOptions))
      console.log('outOfStock SNS was sent')
    }
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

export const main = middyfy(catalogBatchProcess)
