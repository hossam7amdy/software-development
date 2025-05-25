process.on('message', msg => {
  // eslint-disable-next-line no-eval
  const result = eval(`(${msg.code})(${msg.args})`)
  process.send({ event: 'end', data: result })
})

process.send('ready')
