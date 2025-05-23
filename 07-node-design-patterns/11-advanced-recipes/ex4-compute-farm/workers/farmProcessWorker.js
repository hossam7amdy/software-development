process.on('message', msg => {
  const result = eval(`(${msg.code})(${msg.args})`)
  process.send({ event: 'end', data: result })
})

process.send('ready')
