import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyPluginOptions,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'

type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

export type FastifyPluginAsyncTypebox<Options extends FastifyPluginOptions = Record<never, never>> =
  (fastify: FastifyTypebox, opts: Options) => Promise<void>
