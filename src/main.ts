import fastify from 'fastify'
import routes from './routes/index.js'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

server.register(routes, { prefix: '/api' })

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
