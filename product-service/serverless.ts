import type { AWS } from '@serverless/typescript'

import getProductsList from '@functions/getProductsList'
import getProductById from '@functions/getProductById'
import createProduct from '@functions/createProduct'
import catalogBatchProcess from '@functions/catalogBatchProcess'

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PG_HOST: '${env:PGHOST}',
      PG_USER: '${env:PGUSER}',
      PG_DATABASE: '${env:PGDATABASE}',
      PG_PASSWORD: '${env:PGPASSWORD}',
      PG_PORT: '${env:PGPORT}',
    },
  },
  functions: { getProductsList, getProductById, createProduct, catalogBatchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      apiType: 'http',
      basePath: '/${self:provider.stage}',
      generateSwaggerOnDeploy: true,
      typefiles: ['./src/types/api.types.ts', './src/types/product.types.ts', './src/types/common.types.ts'],
    },
    'serverless-offline': {
      httpPort: 4000,
    },
  },
}

module.exports = serverlessConfiguration
