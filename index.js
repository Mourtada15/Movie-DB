const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Ok!')
})

app.use('/test', (req, res) => {
  res.status(200).send({status:200, message:"ok"})
})

app.use('/time', (req, res) => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0')

  const currentTime = `${hours}:${seconds}`;

  res.status(200).send({status:200, message: currentTime});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})