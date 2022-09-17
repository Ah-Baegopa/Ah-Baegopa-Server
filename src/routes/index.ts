import { FastifyPluginAsync } from 'fastify'
import authRoute from './api/auth/index.js'
import meRoute from './api/me/index.js'

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(meRoute, { prefix: '/me' })
}

export default routes
