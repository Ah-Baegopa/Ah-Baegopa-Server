import { FastifySchema } from 'fastify'

export function createRouteSchema<T extends Record<string, FastifySchema>>(params: T) {
  return params
}
