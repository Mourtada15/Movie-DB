const express = require('express')
const app = express()
const port = 3000

app.set('case sensetive routing', false);
let nextId = 5;

const movies = [
  { id: '1', title: 'Jaws', year: 1975, rating: 8 },
  { id: '2', title: 'Avatar', year: 2009, rating: 7.8 },
  { id: '3', title: 'Brazil', year: 1985, rating: 8 },
  { id: '4', title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
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

app.use('/movies/add', (req, res) => {
  const { title, year, rating } = req.query;

  if (!title || !year) {
    return res.status(403).send({
      status: 403,
      error: true,
      message:'You cannot create a movie without providing a title and a year',
    });
  }

  if (!/^\d{4}$/.test(year)) {
    return res.status(403).send({
      status: 403,
      error: true,
      message: 'Not a number',
    });
  }

  const newRating = rating ? parseFloat(rating) : 4;

  const newMovie = {
    id: nextId.toString(),
    title,
    year: parseInt(year),
    rating: newRating,
  };
  nextId++;

  movies.push(newMovie);

  res.status(200).send({status: 200, data: movies });
});

app.get('/movies/read', (req, res) => {
  res.status(200).send({status:200, message: movies})
})

app.get('/movies/read/by-date', (req, res) => {
  const moviesByDate = movies.sort((a, b) => a.year - b.year);
  res.status(200).send({status:200, message: moviesByDate})
})

app.get('/movies/read/by-rating', (req, res) => {
  const moviesByRating = movies.sort((a, b) => b.rating - a.rating);
  res.status(200).send({status:200, message: moviesByRating})
})

app.get('/movies/read/by-title', (req, res) => {
  const moviesByTitle = movies.sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).send({status:200, message: moviesByTitle})
})

app.get('/movies/read/id/:ID', (req, res) => {
  const { ID } = req.params; 
  const movie = movies.find((m) => m.id === ID);

  if (movie) {
    res.status(200).send({status:200, data: movie})
  }
  else
  res.status(404).send({status:404, error:true, message: `The movie ${ID} does not exist`})
})

app.use('/movies/update/:ID', (req, res) => {
  const { ID } = req.params;
  const { title, rating, year } = req.query;

  const movieToUpdate = movies.find((movie) => movie.id === ID );

  // if (!movieToUpdate) {
  //   return res.status(404).send({ status: 404, error: true, message: `The movie ${ID} does not exist`});
  // }

  if (title !== undefined) {
    movieToUpdate.title = title;
  }

  if (rating !== undefined) {
    movieToUpdate.rating = parseFloat(rating);
  }

  if (year !== undefined) {
    movieToUpdate.year = parseInt(year);
  }

  res.status(200).send({ status: 200, data: movies});
});

app.use('/movies/delete/:ID', (req, res) => {
  const { ID } = req.params;
  const index = movies.findIndex((movie) => movie.id === ID);
  
  if (index !== -1) {
    movies.splice(index, 1);

    res.status(200).send({ status: 200, data: movies });
  } else {
    res.status(404).send({ status: 404, error: true, message: `The movie ${ID} does not exist`});
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})