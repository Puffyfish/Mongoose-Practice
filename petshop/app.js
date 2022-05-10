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

const Pets = require('./models/pets')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({extende:true}));

app.get('/', async (req, res) => {
  const pets = await Pets.find({})
  res.render('products/index', { pets })
})

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const pets = await Pets.findById(id)
  res.render('products/details', { pets } )
})



app.listen(3050, (req, res) => {
  console.log('Listening on port 3050!');
})
