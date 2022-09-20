import { test } from 'tap'
import App from '../../src/main.js'

test('default me route', async (tap) => {
  const app = App

  const response = await app.inject({
    method: 'GET',
    url: '/api/me',
  })

  tap.equal(response.statusCode, 200, 'returns a status code of 200')
})
