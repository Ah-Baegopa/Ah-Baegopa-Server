import fastify from 'fastify'

const server = fastify({
  logger: true,
})

server.get('/ping', async (request, reply) => {
  return 'pongdddss'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})