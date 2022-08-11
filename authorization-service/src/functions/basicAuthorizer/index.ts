import { handlerPath } from '@libs/handler-resolver'
import { AWSFunction } from 'src/types'

const functionConfig: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
}

export default functionConfig
