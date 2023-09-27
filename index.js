const express = require('express')
const app = express()
const port = 3000

app.set('case sensetive routing', false);

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get('/', (req, res) => {
  res.send('Ok!')
})

app.use('/test', (req, res) => {
  res.status(200).send({status:200, message:"ok"})
})

app.get('/time', (req, res) => {
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

app.get('/search', (req, res) => {
  const { s } = req.query;

  if (s !== undefined && s !== "") {
    res.status(200).send({status:200, message:"ok", data: s });
  } else {
    res.status(500).send({status:500, error:true, message:"You have to provide a search"})
  } console.log(s)
  
})

app.use('/create', (req, res) => {
  res.status(200).send({status:200, message:"create"})
})

app.get('/movies/read', (req, res) => {
  res.status(200).send({status:200, message: movies})
})

app.use('/update', (req, res) => {
  res.status(200).send({status:200, message:"update"})
})

app.use('/delete', (req, res) => {
  res.status(200).send({status:200, message:"delete"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})