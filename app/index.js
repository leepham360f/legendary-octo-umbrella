if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const RabbitMQWrapper = require('../common/mq/wrapper')
const { BgTaskEvent } = require('../common/mq/bg-task')

app.get('/app/:id', async (req, res) => {
  res.send({
    data: 'message',
  })
})

const start = async () => {
  try {
    await RabbitMQWrapper.connect()
    new BgTaskEvent(RabbitMQWrapper.client.channel).listen()
  } catch (error) {
    console.log(error)
  }

  app.listen(4002, async () => {
    console.log('Listening on 4002')
  })
}

start()
