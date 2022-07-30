import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePaths: ['<rootDir>/'],
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/src/libs/$1',
  },
}
export default config
