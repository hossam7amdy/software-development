import { SubsetSum } from '../subsetSum.ts'

process.on('message', (msg: any) => {
  const subsetSum = new SubsetSum(msg.sum, msg.set)

  subsetSum.on('match', data => {
    process.send!({ event: 'match', data })
  })

  subsetSum.on('end', data => {
    process.send!({ event: 'finish', data: subsetSum.totalSubsets })
    process.send!({ event: 'end', data })
  })

  subsetSum.start()
})

process.send!('ready')
