export enum StatusCodes {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const ResponseMessages = {
  [StatusCodes.NOT_FOUND]: 'Product not found',
  [StatusCodes.SERVER_ERROR]: 'Internal Server Error',
}

export const defaultHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
}
