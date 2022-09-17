import { FastifyPluginAsync } from 'fastify'

const meRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

export default meRoute
