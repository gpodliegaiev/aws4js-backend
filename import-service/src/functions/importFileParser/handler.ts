import { GetObjectRequest, CopyObjectRequest, DeleteObjectRequest } from '@aws-sdk/client-s3'
import csv from 'csv-parser'
import { handleResponse } from '@libs/api-gateway'
import { bucketName } from 'serverless.constants'
import { S3Folders, StatusCodes } from 'src/constants'
import { s3Client } from 'src/s3Client'
import { ValidatedS3Event } from 'src/types'
import { Readable } from 'stream'

const importFileParser: ValidatedS3Event = async event => {
  try {
    const parsedCsv = []
    const { key } = event.Records[0].s3.object

    const objectArgs: GetObjectRequest = {
      Bucket: bucketName,
      Key: key,
    }

    const response = await s3Client.getObject(objectArgs)

    for await (const chunk of (response.Body as Readable).pipe(csv())) {
      parsedCsv.push(chunk)
    }

    parsedCsv.forEach(item => console.log(item))

    const objectCopyArgs: CopyObjectRequest = {
      Bucket: bucketName,
      CopySource: `${bucketName}/${key}`,
      Key: `${key.replace(S3Folders.UPLOADED, S3Folders.PARSED)}`,
    }

    await s3Client.copyObject(objectCopyArgs)
    await s3Client.deleteObject(objectArgs as DeleteObjectRequest)

    return handleResponse(null, StatusCodes.ACCEPTED)
  } catch (error) {
    return handleResponse(null, StatusCodes.SERVER_ERROR, error.message)
  }
}

export { importFileParser as main }
