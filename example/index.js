const th1 = new MultiThread('./worker.js')
const ping = () => {
  th1.send('ping', {
    my: 'data'
  })
}
let count = 0

th1.on('pong', data => {
  if (count === 50) {
    th1.kill()
  }

  console.log('from worker', data)
  ping()
  count++
})

ping()
