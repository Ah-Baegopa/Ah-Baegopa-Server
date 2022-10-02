import { Type } from '@sinclair/typebox'
import { routeSchema } from '../../../lib/routeSchema.js'

export const AuthBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

export const AuthResult = Type.Object({
  token: Type.String(),
})

export const loginSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
  },
})
