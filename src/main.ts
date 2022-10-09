import fastify from 'fastify'
import swagger from '@fastify/swagger'
import fastifyCookie from '@fastify/cookie'
import { swaggerConfig } from './config/swagger.js'
import routes from './routes/index.js'
import { isAppError } from './lib/AppError.js'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

server.register(swagger, swaggerConfig)
server.register(fastifyCookie)
server.setErrorHandler(async (error, request, reply) => {
  reply.statusCode = error.statusCode ?? 500
  if (isAppError(error)) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
    }
  } else {
    return {
      name: 'UnknownError',
      message: error.message,
      statusCode: 500,
    }
  }
})

server.register(routes, { prefix: '/api' })

server.listen({ port: 8081 })

export default server
