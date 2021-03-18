const { EmitLogPublisher } = require('./emit-log')
const RabbitMQWrapper = require('../common/mq/wrapper')
const Queue = require('bull')

const analyticsQueue = new Queue('GA analytics', {
  redis: {
    host: process.env.REDIS_HOST,
    port: '6379',
    password: '123456',
  },
})

analyticsQueue.process(async (job) => {
  console.log('start job');
  await new EmitLogPublisher(RabbitMQWrapper.client.channel).publish({
    subject: 'SYNC_DATA_EVENT',
    payload: {
      id: new Date().getTime(),
    },
  })
})

analyticsQueue.add({}, { repeat: { cron: process.env.CRON } })
