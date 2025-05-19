import { asyncRoutine } from './asyncRoutine.js'
import { CancelError } from './cancelError.js'

async function cancelable(abortSignal: AbortSignal) {
  const resA = await asyncRoutine('A')
  console.log(resA)
  if (abortSignal.aborted) {
    throw new CancelError()
  }

  const resB = await asyncRoutine('B')
  console.log(resB)
  if (abortSignal.aborted) {
    throw new CancelError()
  }

  const resC = await asyncRoutine('C')
  console.log(resC)
}

// const abortController = new AbortController()
// cancelable(abortController.signal).catch(err => {
//   if (err instanceof CancelError) {
//     console.log('Function canceled')
//   } else {
//     console.error(err)
//   }
// })

// setTimeout(() => {
//   abortController.abort()
// }, 100)

const abortSignal = AbortSignal.timeout(200)
cancelable(abortSignal).catch(err => {
  if (err instanceof CancelError) {
    console.log('Function canceled')
  } else {
    console.error(err)
  }
})
