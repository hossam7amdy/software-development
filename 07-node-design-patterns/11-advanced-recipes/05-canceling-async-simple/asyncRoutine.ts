export function asyncRoutine(label: string) {
  console.log(`Starting async routine ${label}`)
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Async routine ${label} completed`)
      resolve(`Async routine ${label} result`)
    }, 100)
  })
}
