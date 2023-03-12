export const parseBasicToken = (token: string): { login: string; password: string } => {
  const [login, password] = Buffer.from(token.split(' ')[1], 'base64').toString().split(':')

  return { login, password }
}
