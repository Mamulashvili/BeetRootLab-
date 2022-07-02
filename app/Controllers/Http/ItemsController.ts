import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Item from 'App/Models/Item'
import { paginationCount } from 'Config/app'

export default class ItemsController {
  public async index({ request, response }) {
    const { page = 1 } = request.qs()
    const items = await Item.query().paginate(page, paginationCount)

    response.send(items)
  }

  public async store({ request, response }: HttpContextContract) {
    const itemSchema = schema.create({
      name: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: itemSchema })
    const item = await Item.create(payload)
    response.status(201)

    response.send({
      data: item,
      meta: {
        status: 1,
        message: 'Item creted',
      },
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const item = await Item.findOrFail(params.id)
    await item.delete()

    response.send({
      data: item,
      meta: {
        status: 1,
        message: 'Item deleted',
      },
    })
  }

  public async search({ request, response }: HttpContextContract) {
    const body = request.body()
    const items = await Item.query().whereILike('name', `%${body?.name}%`)

    response.send({ data: items, meta: request.body() })
  }
}
