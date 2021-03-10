const { Listener } = require('./listener')
class SyncTaskEvent extends Listener {
  constructor(channel) {
    channel.prefetch(1)
    super('BG', 'bg-queue', channel)
  }
  onMessage(msg) {
    const data = this.parseData(msg)
    console.log(data);
    this.channel.ack(msg)
  }
}

module.exports = {
  SyncTaskEvent,
}
