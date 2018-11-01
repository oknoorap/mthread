export default class MultiThread {
  constructor(fileNameOrBool) {
    if (typeof fileNameOrBool === 'undefined') {
      throw new Error('Filename should be path of file or a Boolean.')
    }

    this.events = []
    this.stop = false
    this.fileName = fileNameOrBool

    if (typeof fileNameOrBool === 'boolean' && fileNameOrBool) {
      return this.worker()
    }

    return this.sender()
  }

  worker() {
    this.worker = self
    return this.engine()
  }

  sender() {
    this.worker = new Worker(this.fileName)
    return this.engine()
  }

  engine() {
    this.send = (eventName, data) => {
      this.worker.postMessage({
        eventName,
        data
      })
    }

    this.on = (eventName, fn) => {
      this.events.push({
        eventName,
        fn
      })
    }

    this.pause = () => {}

    this.resume = () => {}

    this.kill = () => {
      if (typeof this.worker.terminate !== 'undefined') {
        this.stop = false
        this.worker.terminate()
      }
    }

    this.worker.addEventListener('message', event => {
      if (typeof event.data !== 'object' && !event.data.eventName) {
        return
      }

      const execute = this.events.find(item => item.eventName === event.data.eventName)
      if (execute) {
        execute.fn.call(this, event.data.data || undefined)
      }
    })

    // Handle pause event-based.
    this.on('$$pause', () => {
      this.stop = true
    })

    // Handle resume event-based.
    this.on('$$resume', () => {
      this.stop = false
    })

    return this
  }
}
