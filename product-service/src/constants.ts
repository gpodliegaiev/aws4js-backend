export enum StatusCodes {
  OK = 200,
  NOT_FOUND = 404,
}

export const ResponseMessages = {
  [StatusCodes.NOT_FOUND]: 'Product not found',
}
