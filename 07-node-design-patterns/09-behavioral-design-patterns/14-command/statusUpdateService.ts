const statusUpdates = new Map<number, string>()

// The Target
export const statusUpdateService = {
  postUpdate(status: string) {
    const id = Math.floor(Math.random() * 1000000)
    statusUpdates.set(id, status)
    console.log(`Status posted: ${status}`)
    return id
  },

  destroyUpdate(id: number) {
    statusUpdates.delete(id)
    console.log(`Status removed: ${id}`)
  }
}
