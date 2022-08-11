import { APIGatewayTokenAuthorizerHandler } from 'aws-lambda'

const defaultDenyAllPolicy = {
  principalId: 'user',
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: 'Deny',
        Resource: '*',
      },
    ],
  },
}

const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (event, ctx, cb) => {
  try {
    console.log('Event: ', JSON.stringify(event))

    return defaultDenyAllPolicy
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))
  }
}

export { basicAuthorizer as main }
