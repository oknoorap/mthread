# Multithread or `mthread`
A simple Multithread with Web Worker based on Events.

## Install
```bash
# npm
npm install mthread --save

# yarn
yarn add mthread
```

## Usage (browser)
`index.html`:
```html
<!-- .... html content -->
<script defer src="https://unpkg.com/mthread/dist/mthread.min.js"></script>
<script defer type="module">
  const thread = new MultiThread('./worker.js')

  thread.on('pong', number) => {
    console.log(`got reply from worker, x + y = ${number}`)
  })
  
  // Send ping with data
  thread.send('ping', {
    x: 1,
    y: 1
  })
</script>
```

`worker.js`
```javascript
importScripts('https://unpkg.com/mthread/dist/mthread.min.js')

const thread = new MultiThread(true)

thread.on('ping', ({ x, y }) => {
  thread.send('pong', x + y)
})
```

## License
MIT (c) 2018
