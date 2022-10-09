import { FastifyPluginAsync } from 'fastify'
import requireAuthPlugin from '../../../plugins/requireAuthPlugin.js'
import { MeRouteSchema } from './schema.js'

const meRoute: FastifyPluginAsync = async (fastify) => {
  fastify.register(requireAuthPlugin)

  fastify.get('/', { schema: MeRouteSchema['GetAccount'] }, async (request, reply) => {
    console.log(request.user, request.isExpiredToken)
    return request.user
  })
}

export default meRoute
