import { test } from '@japa/runner'

test('Check base route response', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({ response: 'Hello API' })
})
