importScripts('../main.js')

const th1 = new MultiThread(true)

th1.on('ping', data => {
  setTimeout(() => {
    console.log('from main thread:', data)
    th1.send('pong', 'data')
  }, Math.round(Math.random(0, 100) * 100000))
})
