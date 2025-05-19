import { CancelError } from './cancelError.js'

export function createCancelWrapper(): {
  cancelWrapper: Function
  cancel: AbortController['abort']
} {
  const abortController = new AbortController()

  function cancelWrapper(
    func: (...args: unknown[]) => any,
    ...args: unknown[]
  ) {
    if (abortController.signal.aborted) {
      return Promise.reject(new CancelError())
    }
    return func(...args)
  }

  return { cancelWrapper, cancel: abortController.abort.bind(abortController) }
}
