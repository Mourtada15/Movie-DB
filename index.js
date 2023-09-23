const express = require('express')
const app = express()
const port = 3000

app.set('case sensetive routing', false);

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

app.use('/hello/:ID?', (req, res) => {
  const { ID } = req.params;
  const message = ID ? `Hello, ${ID}` : "Hello";

  res.status(200).send({status:200, message });
})

app.use('/search', (req, res) => {
  const { s } = req.query;

  if (s !== undefined && s !== "") {
    res.status(200).send({status:200, message:"ok", data: s });
  } else {
    res.status(500).send({status:500, error:true, message:"You have to provide a search"})
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})