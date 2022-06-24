const mongoose = require('mongoose');

// require model database
const Employee = require('./models/employees');

mongoose.connect('mongodb://localhost:27017/humanResources', { useNewUrlParser: true })
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
      name: 'Charles Green',
      position: 'CEO',
      gender: 'Male',
      age: 35,
      yearsEmployed: 9,
      jobcategory: 'A',
      salary: 3000
    },
    {
      name: 'Carole Lee',
      position: 'General Manager',
      gender: 'Female',
      age: 36,
      yearsEmployed: 6,
      jobcategory: 'A',
      salary: 3000
    },
    {
      name: 'Edward Amorez',
      position: 'Head of IT',
      gender: 'Male',
      age: 31,
      yearsEmployed: 3,
      jobcategory: 'A',
      salary: 2200
    },
    {
      name: 'Emily Smith',
      position: 'HR Manager',
      gender: 'Female',
      age: 31,
      yearsEmployed: 3,
      jobcategory: 'B',
      salary: 1800
    },
    {
      name: 'Helen Born',
      position: 'Office Clerk',
      gender: 'Female',
      age: 28,
      yearsEmployed: 1,
      jobcategory: 'C',
      salary: 1200
    },
    {
      name: 'Amanda Mendez',
      position: 'Office Clerk',
      gender: 'Female',
      age: 29,
      yearsEmployed: 3,
      jobcategory: 'C',
      salary: 1200
    },
  ]

  // if any of the seedProducts dont passed
  // mongoose's validation, then nothing will be inserted
  Employee.insertMany(seedEmployees)
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
