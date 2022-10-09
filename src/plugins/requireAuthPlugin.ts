import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import AppError from '../lib/AppError.js'

const requireAuthPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('preHandler', async (request) => {
    // 토큰이 만료된 경우
    if (request.isExpiredToken) {
      throw new AppError('UnauthorizedError', {
        isExpiredToken: true,
      })
    }

    // 잘못된 접근인 경우
    if (!request.user) {
      throw new AppError('UnauthorizedError', {
        isExpiredToken: false,
      })
    }
  })
}

const requireAuthPlugin = fp(requireAuthPluginAsync, {
  name: 'requireAuthPlugin',
})

export default requireAuthPlugin
