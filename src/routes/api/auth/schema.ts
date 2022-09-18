import { Static, Type } from '@sinclair/typebox'

export const AuthBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

// export type AuthBodyType = Static<typeof AuthBody>

export const AuthResult = Type.Object({
  token: Type.String(),
})

export const loginSchema = {
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
  },
}
