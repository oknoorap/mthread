const thread = new MultiThread('./worker.js')

// thread.on('pong', data => {
//   console.log('got pong from worker, with data:', data)
// })

// thread.send('ping')

for (let i = 0; i < 100; i++) {
  thread.send('ping')
}
