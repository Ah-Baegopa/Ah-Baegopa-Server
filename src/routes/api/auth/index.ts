import { FastifyPluginAsync } from 'fastify'

const authRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/login', async (request, reply) => {
    return { hello: 'world' }
  })
}

export default authRoute
