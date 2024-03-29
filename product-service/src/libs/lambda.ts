import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import inputOutputLogger from '@middy/input-output-logger'
import { argumentsLogger } from './middlewares'

export const middyfy = handler => {
  return middy(handler).use(middyJsonBodyParser()).use(inputOutputLogger()).use(argumentsLogger())
}
