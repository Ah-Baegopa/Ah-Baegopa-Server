import { createRouteSchema } from '../../../lib/routeSchema.js'
import { UserSchema } from '../../../schema/userSchema.js'

export const MeRouteSchema = createRouteSchema({
  GetAccount: {
    tags: ['me'],
    response: {
      200: UserSchema,
    },
  },
})
