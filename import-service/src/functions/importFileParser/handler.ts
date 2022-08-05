import { S3Handler } from 'aws-lambda'
import { GetObjectRequest, CopyObjectRequest, DeleteObjectRequest } from '@aws-sdk/client-s3'
import { SendMessageCommand, SendMessageCommandInput } from '@aws-sdk/client-sqs'
import csv from 'csv-parser'
import { Readable } from 'stream'
import { bucketName } from 'serverless.constants'
import { S3Folders } from 'src/constants'
import { s3Client } from 'src/s3Client'
import { sqsClient } from 'src/sqsClient'

const importFileParser: S3Handler = async event => {
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

    for (const product of parsedCsv) {
      const commandOptions: SendMessageCommandInput = {
        QueueUrl: process.env.SQS_URL,
        MessageBody: JSON.stringify(product),
        MessageGroupId: 'create-product',
      }
      await sqsClient.send(new SendMessageCommand(commandOptions))

      console.log('Product message sent: ', product)
    }

    const objectCopyArgs: CopyObjectRequest = {
      Bucket: bucketName,
      CopySource: `${bucketName}/${key}`,
      Key: `${key.replace(S3Folders.UPLOADED, S3Folders.PARSED)}`,
    }

    await s3Client.copyObject(objectCopyArgs)
    await s3Client.deleteObject(objectArgs as DeleteObjectRequest)
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))
  }
}

export { importFileParser as main }
