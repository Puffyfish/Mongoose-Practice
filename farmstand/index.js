const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

// require model database
const Product = require('./models/product');
const Farm = require('./models/farm');
const categories = ['fruit', 'vegetable', 'dairy', 'mushroom']

mongoose.connect('mongodb://localhost:27017/farmStandStage2', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

// sets the path
app.set('views', path.join(__dirname, 'views'));

// sets the templating app used
app.set('view engine', 'ejs');

// to parse data from an empty or undefined object
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// FARM routes
app.get('/farms', async(req, res) => {
  const farms = await Farm.find({})
  res.render('farms/index', {farms});
})

app.get('/farms/new', (req, res) => {
  res.render('farms/new');
})

app.post('/farms', async(req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  console.log(farm);
  res.redirect('/farms');
})


// PRODUCT ROUTES
app.get('/products', async (req, res) => {
  // this is an async fxn coz Product.find will take some time to load
  // product.find({}) means to find ALL products
  const products = await Product.find({})
  console.log(products)
  res.render('products/index', { products });
})

// one of the routes needed to create product: a form to input data
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories} )
})

// one of the routes needed to create product: to receive data
app.post('/products', async (req, res) => {
  const newProduct = new Product (req.body);
  await newProduct.save();
  res.redirect(`products/${newProduct._id}`);
})

// show
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/details', { product })
})

// get request route for the EDIT, to figure out which id we want to edit
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  res.render('products/edit', { product, categories })
})

// post after sending data from editing product
app.put('/products/:id', async(req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  // console.log(req.body) if you want to see the data
  res.redirect(`/products/${product._id}`)
})

// Delete route
app.delete('/products/:id', async(req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  console.log(`${deletedProduct.name} has been deleted`)
  res.redirect('/products');
})

app.listen(3000, () => {
  console.log('App is listening on port 3000!');
})
