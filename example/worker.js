// importScripts('https://unpkg.com/mthread/dist/mthread.min.js')
importScripts('../dist/mthread.min.js')

const thread = new MultiThread(true)
console.log(thread.events)

// thread.on('ping', () => {
//   console.log('got ping from main thread')
//   console.log('send pong to main thread')

//   // Send data to main thread
//   thread.send('pong', {
//     fromWorker: true
//   })
// })

thread.on('ping', () => {
  const random = Math.random() * 10000
  setTimeout(() => {
    console.log('run task', random)
  }, Math.round(random))
})
