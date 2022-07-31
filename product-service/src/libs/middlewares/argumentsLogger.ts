import { MiddlewareObj } from '@middy/core'

export const argumentsLogger = (): MiddlewareObj => {
  return { before: args => console.log(args) }
}
