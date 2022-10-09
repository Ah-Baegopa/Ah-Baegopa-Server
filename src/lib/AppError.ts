export const errors = {
  // 인증 에러
  AuthenticationError: {
    statusCode: 401,
    message: 'Invalid username or password',
  },
  UserExistsError: {
    statusCode: 409,
    message: 'User already exists',
  },
  // 권한 에러
  UnauthorizedError: {
    statusCode: 401,
    message: 'Unauthorized',
  },
}

type ErrorName = keyof typeof errors

interface ErrorPayload {
  UnauthorizedError: {
    isExpiredToken: boolean
  }
}

type ErrorPayloadWithDefault = Omit<Record<ErrorName, undefined>, keyof ErrorPayload> &
  ErrorPayload

export default class AppError extends Error {
  public statusCode: number

  constructor(
    public name: ErrorName,
    public payload?: ErrorPayloadWithDefault[ErrorName],
  ) {
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
