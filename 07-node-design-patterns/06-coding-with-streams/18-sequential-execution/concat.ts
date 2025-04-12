import { concatFiles } from './concat-files'

async function main() {
  try {
    await concatFiles(process.argv[2], process.argv.slice(3))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  console.log('All files concatenated successfully')
}

main()
