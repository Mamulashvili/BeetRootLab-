import Item from 'App/Models/Item'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Item, ({ faker }) => {
  return {
    name: faker.internet.userName(),
  }
}).build()
