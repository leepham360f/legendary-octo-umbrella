if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const f = require('./file.json');
// const logger = require('./logger')
// const RabbitMQWrapper = require('../common/mq/wrapper')
// const { BgTaskEvent } = require('../common/mq/bg-task')
const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/test.log',
      level: 'info'
    }),
  ]
});

app.get('/app/logs', async (req, res) => {
  return logger.query({
    limit: 1000
  }, (err, results) => {
    return res.send(results.file)
  })
})

app.get('/app/:id', async (req, res) => {
  logger.info({
    id: req.params.id
  });
  res.send({
    data: 'message',
  })
})

// app.get('/app', async (req, res) => {
//   res.send({
//     data: 'message',
//   })
// })

const start = async () => {
  try {
    // await RabbitMQWrapper.connect()
    // new BgTaskEvent(RabbitMQWrapper.client.channel).listen()
  } catch (error) {
    console.log(error)
  }

  app.listen(4002, async () => {
    console.log('Listening on 4002')
  })
}

start()
