import { request } from './request'

const BASE_URL = 'http://localhost:3000'

// Helper function to wait for server to start
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function runTests() {
  try {
    console.log('Starting tests for custom request builder...')

    // Test 1: Get all posts
    console.log('\n📌 TEST 1: GET all posts')
    const allPosts = await request.get(`${BASE_URL}/posts`).invoke<string>()
    console.log('All posts:', JSON.parse(allPosts))

    // Test 2: Get a specific post
    console.log('\n📌 TEST 2: GET specific post')
    const post = await request
      .get(`${BASE_URL}/posts/my-first-post`)
      .invoke<string>()
    console.log('Specific post:', JSON.parse(post))

    // Test 3: Create a new post
    console.log('\n📌 TEST 3: POST a new post')
    const newPost = await request
      .post(`${BASE_URL}/posts`)
      .setHeader('content-type', 'application/json')
      .setBody({
        id: 'test-post',
        title: 'Test post',
        content: 'This is a test post created with our custom request builder'
      })
      .invoke<string>()
    console.log('New post created:', JSON.parse(newPost))

    // Test 4: Delete a post
    console.log('\n📌 TEST 4: DELETE a post')
    const deleteResult = await request
      .delete(`${BASE_URL}/posts/test-post`)
      .invoke<string>()
    console.log('Delete result:', JSON.parse(deleteResult))

    // Test 5: Try to get a non-existent post
    console.log('\n📌 TEST 5: GET non-existent post')
    try {
      const nonExistentPost = await request
        .get(`${BASE_URL}/posts/non-existent`)
        .invoke<string>()
      console.log('Result:', JSON.parse(nonExistentPost))
    } catch (error) {
      console.error('Error fetching non-existent post:', error)
    }

    // Test 6: Test query parameters
    console.log('\n📌 TEST 6: Testing query parameters')
    const postsWithParams = await request
      .get(`${BASE_URL}/posts`)
      .setQuery('limit', '2')
      .invoke<string>()
    console.log('Posts with query params:', JSON.parse(postsWithParams))

    console.log('\n✅ All tests completed!')
  } catch (error) {
    console.error('Error during tests:', error)
  }
}

console.log('Waiting for server to start...')
// Give server a moment to start if it's running separately
wait(1000).then(runTests)
