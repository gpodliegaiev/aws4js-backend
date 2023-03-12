import { mockClient } from 'aws-sdk-client-mock'
import { PublishCommand } from '@aws-sdk/client-sns'
import { Context, SQSEvent, SQSRecord } from 'aws-lambda'
import { main as catalogBatchProcess } from '../handler'
import { snsClient } from 'src/snsClient'

jest.mock('src/services/product.service', () => {
  return {
    productService: {
      createProduct: () => 'test-id',
    },
  }
})

const snsMock = mockClient(snsClient)

const product1 = {
  title: 'SQS Product test 1',
  description: 'test',
  price: '1',
  count: '0',
}

const product2 = {
  title: 'SQS Product test 2',
  description: 'test',
  price: '1',
  count: '1',
}

const event: SQSEvent = {
  Records: [
    {
      body: JSON.stringify(product1),
    },
    {
      body: JSON.stringify(product2),
    },
  ] as unknown as SQSRecord[],
}

describe('catalogBatchProcess', () => {
  test('should call snsClient with PublishCommand', async () => {
    await catalogBatchProcess(event, {} as Context)

    expect(snsMock).toHaveReceivedCommandTimes(PublishCommand, 2)
  })
})
