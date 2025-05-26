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
    }
  ]
}
