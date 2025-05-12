import { statusUpdateService } from './statusUpdateService.ts'

type Service = typeof statusUpdateService

export const createPostStatusCmd = (service: Service, status: string) => {
  let postId: number | null = null

  // The Command
  return {
    run() {
      postId = service.postUpdate(status)
    },
    undo() {
      if (postId) {
        service.destroyUpdate(postId)
        postId = null
      }
    },
    serialize() {
      return { type: 'status', action: 'post', status }
    }
  }
}
