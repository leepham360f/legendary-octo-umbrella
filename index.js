const express = require("express")
const bodyParser = require("body-parser")

const app = express()
// app.use(bodyParser.json())

const posts = {}

// add comment
app.get("/", (req, res) => {
  res.send({
    data: 'hello world'
  })
})

app.listen(4002, async () => {
  console.log("Listening on 4002")
});
