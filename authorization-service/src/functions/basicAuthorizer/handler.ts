import { APIGatewayTokenAuthorizerHandler } from 'aws-lambda'
import { generatePolicy } from '@libs/generate-policy'
import { parseBasicToken } from '@libs/parse-basic-token'

const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async event => {
  try {
    console.log('Event: ', JSON.stringify(event))
    const { authorizationToken, methodArn } = event

    const { login, password } = parseBasicToken(authorizationToken)

    if (process.env[login] === password) {
      return generatePolicy(methodArn)
    }

    return generatePolicy()
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))
    return generatePolicy()
  }
}

export { basicAuthorizer as main }
