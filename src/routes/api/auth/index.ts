import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { setTokenCookie } from '../../../lib/cookies.js'
import UserService from '../../../services/UserService.js'
import { AuthRouteSchema } from './schema.js'

const authRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post(
    '/register',
    { schema: AuthRouteSchema['Register'] },
    async (request, reply) => {
      const authResult = await userService.register(request.body)
      setTokenCookie(reply, authResult.tokens)

      return authResult
    },
  )

  fastify.post('/login', { schema: AuthRouteSchema['Login'] }, async (request, reply) => {
    const authResult = await userService.login(request.body)
    setTokenCookie(reply, authResult.tokens)

    return authResult
  })
}

export default authRoute
