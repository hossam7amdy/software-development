import { ReplaceStream } from './replace-stream.ts'

process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout)
