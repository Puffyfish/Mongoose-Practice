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

// TO INSERT PRODUCTS ONE AT A TIME
  // const p = new Product ({
  //   name: 'Ruby Grapefruit',
  //   price: 1.99,
  //   category: 'fruit'
  // })
  // p.save()
  //   .then(p => {
  //     console.log(p)
  //   })
  //   .catch(e =>{
  //     console.log(e);
  //   })

//  TO INSERT MULTIPLE PRODUCTS
const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.00,
    category: 'vegetable'
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit'
  },
  {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
  },
  {
    name: 'Organic Celery',
    price: 1.50,
    category: 'vegetable'
  },
  {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy'
  }
]

// if any of the seedProducts dont passed
// mongoose's validation, then nothing will be inserted
Product.insertMany(seedProducts)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })
