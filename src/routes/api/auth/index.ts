import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { FastifyPluginAsync } from 'fastify'
import { loginSchema } from './schema.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/login', { schema: loginSchema }, async (request, reply) => {
      console.log(request.body.username, request.body.password)

      return { token: 'world' }
    })
}

export default authRoute
