const express = require("express")
const bodyParser = require("body-parser")
require('./scripts/deploy');
const app = express()
app.use(bodyParser.json())

const posts = {}


app.get("/", (req, res) => {

  res.send({
    data: 'hello world fix bug'
  })
})

app.listen(4002, async () => {
  console.log("Listening on 4002")
})
