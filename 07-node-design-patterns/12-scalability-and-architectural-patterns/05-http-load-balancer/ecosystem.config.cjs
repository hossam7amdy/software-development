module.exports = {
  apps: [
    {
      name: 'node01',
      script: 'app.js',
      env: {
        PORT: 8081
      }
    },
    {
      name: 'node02',
      script: 'app.js',
      env: {
        PORT: 8082
      }
    },
    {
      name: 'node03',
      script: 'app.js',
      env: {
        PORT: 8083
      }
    },
    {
      name: 'node04',
      script: 'app.js',
      env: {
        PORT: 8084
      }
    }
  ]
}
