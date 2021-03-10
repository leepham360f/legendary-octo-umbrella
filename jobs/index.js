if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const RabbitMQWrapper = require('../common/mq/wrapper')
const { EmitLogPublisher } = require('./emit-log')

app.get('/bg', async (req, res) => {
  await new EmitLogPublisher(RabbitMQWrapper.client.channel).publish({
    subject: 'SYNC_DATA_EVENT',
    payload: {
      id: new Date().getTime(),
    },
  })
  res.send('Mannually trigger event')
})

const start = async () => {
  try {
    await RabbitMQWrapper.connect()
    require('./queue')
  } catch (error) {
    console.log(error)
  }

  app.listen(4000, async () => {
    console.log('Listening on 4000')
  })
}

start()
