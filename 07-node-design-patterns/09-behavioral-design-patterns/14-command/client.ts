import { createPostStatusCmd } from './createPostStatusCmd.ts'
import { statusUpdateService } from './statusUpdateService.ts'
import { Invoker } from './invoker.ts'

// The Client code
const invoker = new Invoker()
const command = createPostStatusCmd(statusUpdateService, 'HI!')
invoker.run(command)
invoker.undo()
invoker.delay(command, 1000 * 3)
invoker.runRemotely(command)
