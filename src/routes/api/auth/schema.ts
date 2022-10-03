import { Type } from '@sinclair/typebox'
import { routeSchema } from '../../../lib/routeSchema.js'

export const AuthBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

const TokensSchema = Type.Object({
  accessToken: Type.String(),
  refreshToken: Type.String(),
})

export const UserSchema = Type.Object({
  id: Type.Integer(),
  username: Type.String(),
})

export const AuthResult = Type.Object({
  tokens: TokensSchema,
  user: UserSchema,
})

export const registerSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
  },
})

export const loginSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
  },
})
