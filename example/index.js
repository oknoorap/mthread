const thread = new MultiThread('./worker.js')
const userList = document.querySelector('#users-list')

// Got users info from worker.
thread.on('user-info', ({ username, followers }) => {
  const item = document.createElement('li')
  item.innerHTML = `${username} got ${followers} followers`
  userList.appendChild(item)
})

// Got trending list from worker.
thread.on('trending-list', list => {
  // Request user info to worker
  list.forEach(username => {
    thread.send('get-info', username)
  })
})

// Request trending developers.
thread.send('get-trending')
