import { salesDb } from './db.js'
import { nanoid } from 'nanoid'

const products = ['book', 'game', 'app', 'song', 'movie']

const populate = async () => {
  for (let i = 0; i < 100_000; i++) {
    await salesDb.put(nanoid(), {
      amount: Math.ceil(Math.random() * 100),
      product: products[Math.floor(Math.random() * 5)]
    })
  }

  console.log('DB populated')
}

populate()
