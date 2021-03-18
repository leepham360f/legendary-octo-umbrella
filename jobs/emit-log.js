const { Publisher } = require('../common/mq/publisher')
class EmitLogPublisher extends Publisher {
  constructor(connection) {
    super('bg-queue', connection)
  }
}

module.exports = {
  EmitLogPublisher,
}
