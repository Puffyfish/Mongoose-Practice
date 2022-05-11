const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/petShop', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

const Pet = require('./models/pets')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res) => {
  const pets = await Pet.find({})
  console.log(pets)
  res.render('products/index', { pets })
})

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const pets = await Pet.findById(id)
  res.render('products/details', { pets } )
})

// adding New
app.get('/new', (req, res) => {
  res.render('products/new')
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Sent data.')
})



app.listen(3050, (req, res) => {
  console.log('Listening on port 3050!');
})
