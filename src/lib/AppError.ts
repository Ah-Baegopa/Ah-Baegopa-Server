export const errors = {
  AuthenticationError: {
    statusCode: 401,
    message: 'Invalid username or password',
  },
  UserExistsError: {
    statusCode: 409,
    message: 'User already exists',
  },
}

type ErrorName = keyof typeof errors

export default class AppError extends Error {
  public statusCode: number

  constructor(public name: ErrorName) {
    const info = errors[name]
    super(info.message)
    this.statusCode = info.statusCode
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function createAppErrorSchema<T>(example: T) {
  return {
    type: 'object',
    properties: {
      name: { type: 'string' },
      message: { type: 'string' },
      statusCode: { type: 'number' },
    },
    example,
  }
}
