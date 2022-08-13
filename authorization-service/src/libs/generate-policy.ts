import { APIGatewayAuthorizerResult } from 'aws-lambda'

export const generatePolicy = (resource?: string, principalId = 'user'): APIGatewayAuthorizerResult => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: resource ? 'Allow' : 'Deny',
          Resource: resource || '*',
        },
      ],
    },
  }
}
