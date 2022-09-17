import fastify from 'fastify'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

server.get('/ping', async (request, reply) => {
  return 'pong'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
