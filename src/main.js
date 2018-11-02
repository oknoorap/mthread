/* global self, Worker */
const threadTypes = {
  SUB: 'sub',
  MAIN: 'main'
}

export default class MultiThread {
  constructor(fileNameOrBool) {
    if (typeof fileNameOrBool === 'undefined') {
      throw new TypeError('Filename should be path of file or a Boolean.', 'src/main.js')
    }

    this.thread = undefined
    this.type = threadTypes.MAIN
    this.events = []
    this.queues = []
    this.fileName = fileNameOrBool

    if (typeof fileNameOrBool === 'boolean' && fileNameOrBool) {
      this.type = threadTypes.SUB
      return this.worker()
    }

    return this.sender()
  }

  worker() {
    if (this.type === threadTypes.SUB) {
      this.thread = self
      return this.engine()
    }
  }

  sender() {
    if (this.type === threadTypes.MAIN) {
      this.thread = new Worker(this.fileName)
      return this.engine()
    }
  }

  send(eventName, data) {
    if (!this.thread) {
      return
    }

    this.thread.postMessage({
      eventName,
      data
    })
  }

  on(eventName, fn) {
    this.events.push({
      eventName,
      fn
    })
  }

  kill() {
    if (this.thread && typeof this.thread.terminate !== 'undefined') {
      this.thread.terminate()
    }
  }

  engine() {
    this.thread.addEventListener('message', event => {
      if (typeof event.data !== 'object' && !event.data.eventName) {
        return
      }

      const execute = this.events.find(item => item.eventName === event.data.eventName)
      if (execute) {
        execute.fn.call(this, event.data.data || undefined)
      }
    })

    return this
  }
}
