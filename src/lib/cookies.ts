import { FastifyReply } from 'fastify'

export function setTokenCookie(
  reply: FastifyReply,
  token: { accessToken: string; refreshToken: string },
) {
  reply.setCookie('access_token', token.accessToken, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
  })
  reply.setCookie('refresh_token', token.refreshToken, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  })
}

export function clearCookie(reply: FastifyReply) {
  reply.clearCookie('access_token')
  reply.clearCookie('refresh_token')
}
