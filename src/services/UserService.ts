import db from '../lib/db.js'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { generateToken } from '../lib/tokens.js'

const SALT_ROUNDS = 10

interface AuthParams {
  username: string
  password: string
}

class UserService {
  private static instance: UserService

  // 싱글톤 (매번 객체 생성하지 않고 하나의 객체만 사용)
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async createTokenItem(userId: number) {
    const token = await db.token.create({
      data: {
        userId,
      },
    })
    return token
  }

  async generateTokens(user: User) {
    const { id: userId, username } = user
    const token = await this.createTokenItem(userId)
    const tokenId = token.id

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: token.rotationCounter,
      }),
    ])

    return {
      refreshToken,
      accessToken,
    }
  }

  async register({ username, password }: AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (exists) {
      throw new Error('이미 존재하는 사용자입니다.')
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
    })

    const tokens = await this.generateTokens(user)

    return {
      tokens,
      user,
    }
  }

  async login({ username, password }: AuthParams) {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      throw new Error('존재하지 않는 사용자입니다.')
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (!isValid) {
      throw new Error('비밀번호가 일치하지 않습니다.')
    }

    const tokens = await this.generateTokens(user)

    return {
      tokens,
      user,
    }
  }
}

export default UserService
