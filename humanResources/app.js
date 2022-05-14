const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/humanResources', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

const Employee = require('./models/employees')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// to parse data from an empty or undefined object
app.use(express.urlencoded({extended:true}));

// homepage route
app.get('/', (req,res) => {
  res.render('index');
})

app.listen(3080, () => {
  console.log('App is listening on port 3080!')
})
