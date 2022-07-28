import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { handleResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { bucketName } from 'serverless.constants'
import { MimeTypes, signedUrlExpirationTime, StatusCodes } from 'src/constants'
import { s3Client } from 'src/s3Client'
import type { ValidatedEventAPIGatewayProxyEvent } from 'src/types'

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<null> = async event => {
  const { queryStringParameters } = event

  try {
    const { fileName } = queryStringParameters || {}

    if (!fileName) {
      return handleResponse(null, StatusCodes.BAD_REQUEST)
    }

    const bucketParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: `uploaded/${fileName}`,
      ContentType: MimeTypes.CSV,
    }

    const putCommand = new PutObjectCommand(bucketParams)
    const signedUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: signedUrlExpirationTime })

    return handleResponse<string>(signedUrl)
  } catch (error) {
    return handleResponse(null, StatusCodes.SERVER_ERROR, error.message)
  }
}

export const main = middyfy(importProductsFile)
