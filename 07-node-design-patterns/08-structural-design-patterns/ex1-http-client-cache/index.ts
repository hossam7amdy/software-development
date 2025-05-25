import superagent from 'superagent'
import { setTimeout as wait } from 'timers/promises'
import { superagentCachePlugin } from './superagent-cache.js'

const superagentCache = superagentCachePlugin(superagent)

for (let i = 0; i < 10; i++) {
  superagentCache.head('http://localhost:3001/books/1', (err, res) => {
    if (err) {
      console.error('Error:', err)
      return
    }
    console.log('HEAD', res.statusCode)
  })

  superagent
    .get('http://localhost:3001/books/1')
    .set({})
    .send({})
    .end((err, res) => {
      if (err) {
        console.error('Error:', err)
        return
      }
      console.log('GET CB', res.body)
    })

  // BUG: Error: .end() was called twice. This is not supported in superagent
  // superagentCache
  //   .get('http://localhost:3001/books/1')
  //   .set({})
  //   .send({})
  //   .end((err, res) => {
  //     if (err) {
  //       console.error('Error:', err)
  //       return
  //     }
  //     console.log('GET CB', res.body)
  //   })
  superagentCache
    .get('http://localhost:3001/books/1')
    .set({})
    .send({})
    .then(res => console.log('GET Promise', res.body))
    .catch(console.error)

  superagentCache
    .post('http://localhost:3001/books')
    .send({ title: 'Clean Code' })
    .then(res => console.log('POST', res.statusCode))
    .catch(console.error)

  await wait(1000)
}
