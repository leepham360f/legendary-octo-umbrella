const { Listener } = require('./listener')
class BgTaskEvent extends Listener {
  constructor(channel) {
    super('BG', 'bg-queue', channel)
  }
  onMessage(msg, channel) {
    const data = this.parseData(msg)
    console.log(data);
    channel.ack(msg)
  }
}

module.exports = {
  BgTaskEvent,
}
