importScripts('../dist/mthread.min.js')

const thread = new MultiThread(true)

thread.on('get-trending', async () => {
  const list = []
  const trendingDevs = await fetch('https://github-trending-api.now.sh/developers?language=all&since=weekly')
  const json = await trendingDevs.json()

  json.forEach(({ username }) => {
    list.push(username)
  })

  // Send list to main thread.
  thread.send('trending-list', list)
})

thread.on('get-info', async username => {
  const userInfo = await fetch('https://api.github.com/users/octocat')
  const { followers } = await userInfo.json()

  // Send user info to main thread.
  thread.send('user-info', {
    username,
    followers
  })
})
