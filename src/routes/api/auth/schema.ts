import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'
import { createAppErrorSchema, errors } from '../../../lib/AppError.js'
import { createRouteSchema } from '../../../lib/routeSchema.js'

const AuthBodySchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

const TokensSchema = Type.Object({
  accessToken: Type.String(),
  refreshToken: Type.String(),
})

const UserSchema = Type.Object({
  id: Type.Integer(),
  username: Type.String(),
})

const AuthResultSchema = Type.Object({
  tokens: TokensSchema,
  user: UserSchema,
})

export const AuthRouteSchema = createRouteSchema({
  Register: {
    tags: ['auth'],
    body: AuthBodySchema,
    response: {
      200: AuthResultSchema,
      409: createAppErrorSchema({
        name: 'UserExistsError',
        ...errors['UserExistsError'],
      }),
    },
  },
  Login: {
    tags: ['auth'],
    body: AuthBodySchema,
    response: {
      200: AuthResultSchema,
      401: createAppErrorSchema({
        name: 'AuthenticationError',
        ...errors['AuthenticationError'],
      }),
    },
  },
})
