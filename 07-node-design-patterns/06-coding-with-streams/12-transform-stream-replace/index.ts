import { ReplaceStream } from './replace-stream.ts'

const replaceStream = new ReplaceStream('World', 'Node.js')
replaceStream.on('data', chunk => console.log(chunk.toString()))

replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.end()
