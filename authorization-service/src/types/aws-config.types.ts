import { AWS } from '@serverless/typescript'

export type AWSFunction = AWS['functions']['function']
export type AWSRegions = AWS['provider']['region']
