const express = require("express")
const app = express()

app.get("/", (req, res) => {

  res.send({
    data: 'hello world fix bug'
  })
})

app.listen(4002, async () => {
  console.log("Listening on 4002")
})
