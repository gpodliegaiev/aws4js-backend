import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { handleResponse } from '@libs/api-gateway'
import { Context } from 'aws-lambda'
import { StatusCodes } from 'src/constants'
import { main as importProductsFile } from '../handler'

jest.mock('@aws-sdk/s3-request-presigner', () => {
  return {
    getSignedUrl: jest.fn(),
  }
})

const testUrl = 'https://test.com'
const errorMessage = 'Some 500 error'

describe('importProductsFile', () => {
  test('should return 400 error code and message', async () => {
    const response = await importProductsFile({}, {} as Context)
    const responseCheck = handleResponse(null, StatusCodes.BAD_REQUEST)

    expect(response).toEqual(responseCheck)
  })

  test('should return 200 code and url', async () => {
    ;(getSignedUrl as jest.Mock).mockImplementation(() => testUrl)

    const response = await importProductsFile({ queryStringParameters: { fileName: 'test' } }, {} as Context)
    const responseCheck = handleResponse(testUrl)

    expect(response).toEqual(responseCheck)
  })

  test('should return 500 error code and message', async () => {
    ;(getSignedUrl as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage)
    })

    const response = await importProductsFile({ queryStringParameters: { fileName: 'test' } }, {} as Context)
    const responseCheck = handleResponse(null, StatusCodes.SERVER_ERROR, errorMessage)

    expect(response).toEqual(responseCheck)
  })
})
