class Publisher {
  constructor(queue, channel) {
    this.queue = queue
    this.channel = channel
  }

  async publish(data) {
    return new Promise((resolve, reject) => {
      this.channel.assertQueue(
        this.queue,
        {
          durable: true,
        },
        (err) => {
          if (err) reject(err)
        }
      )

      const msg = Buffer.from(JSON.stringify(data))
      this.channel.sendToQueue(this.queue, msg, {
        persistent: true,
      })
      console.log(" [x] Sent '%s'", msg)
      resolve(msg)
    })
  }
}

module.exports = {
  Publisher,
}
