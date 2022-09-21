import { expect } from 'chai'
import App from '../../src/main.js'

describe('default me route', () => {
  it('should return 200', async () => {
    const app = App
    const response = await app.inject({
      method: 'GET',
      url: '/api/me',
    })
    expect(response.statusCode).to.equal(200)
  })
})
