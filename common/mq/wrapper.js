const amqp = require('amqplib/callback_api')
class RabbitMQWrapper {
  constructor() {}
  _client
  get client() {
    if (!this._client) {
      throw new Error('No connection')
    }

    return this._client
  }

  connect() {
    return new Promise((res, rej) => {
      amqp.connect(process.env.CLOUDAMQP_URL, (error0, connection) => {
        if (error0) {
          rej(error0)
        }
        connection.createChannel((error1, channel) => {
          if (error1) {
            reject(error1)
          }
          this._client = {
            connection,
            channel
          }
          res()
        })
      })
    })
  }
}

module.exports = new RabbitMQWrapper()
