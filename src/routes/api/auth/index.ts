import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { FastifyPluginAsync } from 'fastify'
import { loginSchema } from './schema.js'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const authRoute: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/login', { schema: loginSchema }, async (request, reply) => {
      console.log(request.body.username, request.body.password)

      const newUser = await prisma.user.create({
        data: {
          email: request.body.username,
        },
      })

      console.log('newUser', newUser)
      return { token: 'world' }
    })
}

export default authRoute
