const mongoose = require('mongoose');

// require model database
const Pets = require('./models/pets');

mongoose.connect('mongodb://localhost:27017/petShop', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

//  TO INSERT MULTIPLE PRODUCTS
const seedPets = [
  {
    name: 'Fairy Eggplant',
    breed: 'Silky Terrier',
    price: 101.00,
    category: 'Cat'
  },
  {
    name: 'Goddess',
    breed: 'Pug',
    price: 124.99,
    category: 'Dog'
  },
  {
    name: 'Mini Watermelon',
    breed: 'Maltese',
    price: 133.99,
    category: 'Fish'
  },
  {
    name: 'Celery',
    breed: 'Poodle',
    price: 123.50,
    category: 'Dog'
  },
  {
    name: 'Chocolate Milk',
    breed: 'Cavapoos',
    price: 132.69,
    category: 'Cat'
  }
]

// if any of the seedProducts dont passed
// mongoose's validation, then nothing will be inserted
Pets.insertMany(seedPets)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })
