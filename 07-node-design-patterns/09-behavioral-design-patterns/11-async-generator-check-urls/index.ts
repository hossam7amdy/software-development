import { CheckUrls } from './CheckUrls.ts'

async function main() {
  const checkUrls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com'
  ])

  for await (const status of checkUrls) {
    console.log(status)
  }
}

main()
