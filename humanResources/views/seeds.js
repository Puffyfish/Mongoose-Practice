const mongoose = require('mongoose');

// require model database
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

  //  TO INSERT MULTIPLE PRODUCTS
  const seedEmployees = [
    {
      name: 'Fairy Eggplant',
      price: 1.00,
      category: 'vegetable'
    },
  ]

  // if any of the seedProducts dont passed
  // mongoose's validation, then nothing will be inserted
  Product.insertMany(seedEmployees)
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
