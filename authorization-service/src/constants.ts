export enum StatusCodes {
  OK = 200,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const ResponseMessages = {
  [StatusCodes.OK]: 'OK',
  [StatusCodes.ACCEPTED]: 'Accepted',
  [StatusCodes.BAD_REQUEST]: 'Bad Request',
  [StatusCodes.NOT_FOUND]: 'Not found',
  [StatusCodes.SERVER_ERROR]: 'Internal Server Error',
}

export const defaultHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
}
