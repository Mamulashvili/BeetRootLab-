import { test } from '@japa/runner'

type PostBodyType = {
  data: {
    id: number
    name: string
    created_at: string
    updated_at: string
  }
  meta: {
    status: number
    message: string
  }
}

// type DeleteBodyType = {
//   data: {
//     id: number
//     name: string
//     created_at: string
//     updated_at: string
//   }
//   meta: {
//     name: string
//   }[]
// }

test('test get items call', async ({ client }) => {
  const response = await client.get('/items')

  response.assertStatus(200)
  response.assertTextIncludes('meta')
  response.assertTextIncludes('data')
  response.assertBodyContains({
    meta: {
      per_page: 10,
      current_page: 1,
    },
  })
})

test('test store, search and delete', async ({ client }) => {
  const name: string = 'Test name'

  // Store
  const response = await client.post('/items').form({ name })

  response.assertStatus(201)
  response.assertBodyContains({
    meta: {
      status: 1,
      message: 'Item creted',
    },
    data: { name },
  })

  // Search
  const searchResponse = await client.post('/search').form({ name })

  searchResponse.assertStatus(200)
  searchResponse.assertBodyContains({
    meta: {
      name,
    },
  })

  const body: PostBodyType = response.body()
  const createdItemId: number = body.data.id

  // Delete
  const delResponse = await client.delete(`/items/${createdItemId}`)

  delResponse.assertBodyContains({
    data: {
      id: createdItemId,
      name,
    },
    meta: {
      status: 1,
      message: 'Item deleted',
    },
  })
})

// Store API allows only string values
test('store not supported type', async ({ client, assert }) => {
  // Generate 3 digit random number
  const name: number = parseInt((Math.random() * 1000).toFixed(0))

  const response = await client.post('/items').json({ name })

  response.assertStatus(422)
  response.assertBodyContains({
    errors: [
      {
        rule: 'string',
        field: 'name',
        message: 'string validation failed',
      },
    ],
  })
  assert.isTrue(response.hasError())
})
