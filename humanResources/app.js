const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/humanResources', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

const Employee = require('./models/employees');
const gender = ['Female', 'Male'];
const jobCategory = ['A', 'B', 'C'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// to parse data from an empty or undefined object
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// homepage route
app.get('/', async (req,res) => {
  const employees = await Employee.find({});
  console.log(employees)
  res.render('index', { employees });
})

// New route (a)
app.get('/new', (req, res) => {
  res.render('new')
})

// show route for specific id
app.get('/:id', async (req,res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.render('details', { employee });
})

// New route (b)
app.post('/:id', async (req, res) => {
  const newPerson = new Employee(req.body)
  await newPerson.save();
  console.log(newPerson)
  res.redirect(`/${newPerson._id}`);
})

// Edit Route
app.get('/:id/edit', async (req,res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.render('edit', { employee, gender, jobCategory });
})

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Employee.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  res.redirect(`/${updated._id}`)
})

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedEmp = await Employee.findByIdAndDelete(id);
  console.log(`${deletedEmp.name} has been deleted.`);
  res.redirect('/');
})

app.listen(3080, () => {
  console.log('App is listening on port 3080!')
})
