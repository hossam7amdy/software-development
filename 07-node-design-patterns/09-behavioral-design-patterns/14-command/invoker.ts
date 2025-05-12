interface Command {
  run: () => void
  undo: () => void
  serialize: () => Record<string, any>
}

export class Invoker {
  private history: Array<Command>
  constructor() {
    this.history = []
  }

  run(cmd: Command) {
    cmd.run()
    this.history.push(cmd)
    console.log('Command executed', cmd.serialize())
  }

  delay(cmd: Command, ms: number) {
    setTimeout(() => {
      console.log('Executing delayed command', cmd.serialize())
      this.run(cmd)
    }, ms)
  }

  undo() {
    const cmd = this.history.pop()
    if (cmd) {
      cmd.undo()
      console.log('Command undone', cmd.serialize())
    }
  }

  async runRemotely(cmd: Command) {
    const response = await fetch('http://localhost:3000/cmd', {
      method: 'POST',
      body: JSON.stringify(cmd.serialize())
    })
    if (!response.ok) {
      throw new Error(
        `Failed to execute the command on the remote server. ${response.statusText}`
      )
    }
    console.log('Command executed remotely', cmd.serialize())
  }
}
