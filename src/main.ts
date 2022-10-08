import fastify from 'fastify'
import swagger from '@fastify/swagger'
import fastifyCookie from '@fastify/cookie'
import { swaggerConfig } from './config/swagger.js'
import routes from './routes/index.js'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

server.register(swagger, swaggerConfig)
server.register(fastifyCookie)

server.register(routes, { prefix: '/api' })

server.listen({ port: 8080 })

export default server
