class Listener {
  constructor(subject, queue, channel) {
    this.subject = subject
    this.queue = queue
    this.channel = channel
  }

  listen() {
    this.channel.assertQueue(this.queue, {
      durable: true,
    })

    this.channel.prefetch(1)

    this.channel.consume(
      this.queue,
      (msg) => {
        console.log(`Message received ${this.subject} / ${this.queue}`)
        this.onMessage(msg, this.channel)
      },
      {
        noAck: false,
      }
    )
  }

  onMessage(msg) {
    throw new Error('You have to implement the method onMessage!')
  }

  parseData(msg) {
    const data = msg.content.toString()

    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }
}

module.exports = {
  Listener,
}
