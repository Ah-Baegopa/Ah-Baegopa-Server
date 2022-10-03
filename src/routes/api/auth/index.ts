import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import UserService from '../../../services/UserService.js'
import { loginSchema, registerSchema } from './schema.js'

const authRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post('/register', { schema: registerSchema }, async (request, reply) => {
    const authResult = await userService.register(request.body)
    return authResult
  })

  // fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
  //   console.log(request.body.username, request.body.password)
  //   return { token: 'world' }
  // })
}

export default authRoute
