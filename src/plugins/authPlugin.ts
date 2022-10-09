import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { AccessTokenPayload, validateToken } from '../lib/tokens.js'

/**
 * This plugin is used to check if the user is authenticated
 */
const authPluginAsync: FastifyPluginAsync = async (fastify, opts) => {
  fastify.decorateRequest('user', null)
  fastify.decorateRequest('isExpiredToken', false)
  fastify.addHook('preHandler', async (request) => {
    const token = request.cookies.access_token
    console.log({ token })

    // access_token이 없는데 refresh_token만 있으면 access_token이 만료되었다고 판단
    // refresh 되도록 isExpiredToken를 true로 해서 넘겨줌
    if (request.cookies.refresh_token && !token) {
      request.isExpiredToken = true
      return
    }

    // 인가되지 않는 사용자의 잘못된(비인가) 요청
    if (!token) return

    try {
      const decoded = await validateToken<AccessTokenPayload>(token)
      request.user = {
        id: decoded.userId,
        username: decoded.username,
      }
    } catch (e) {
      // 쿠키는 있지만 토큰 기간 만료 에러인 경우
      if (e.name === 'TokenExpiredError') {
        request.isExpiredToken = true
      }
    }
  })
}

export const authPlugin = fp(authPluginAsync, {
  name: 'authPlugin',
})

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: number
      username: string
    } | null
    isExpiredToken: boolean
  }
}
