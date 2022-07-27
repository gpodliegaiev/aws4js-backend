import { defaultHeaders, ResponseMessages, StatusCodes } from 'src/constants'
import type { BodyData, ResponseData } from 'src/types'

export const handleResponse = <T>(responseData: T | ResponseData, httpStatusCode?: StatusCodes, message?: string) => {
  let statusCode = StatusCodes.OK
  let bodyData: T | BodyData = responseData

  if (!responseData) {
    statusCode = httpStatusCode || StatusCodes.NOT_FOUND
    bodyData = {
      message: message || ResponseMessages[statusCode],
    }
  }

  return {
    statusCode,
    headers: defaultHeaders,
    body: JSON.stringify(bodyData),
  }
}
