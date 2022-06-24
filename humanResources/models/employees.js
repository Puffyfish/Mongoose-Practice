const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  gender: ['Female', 'Male'],
  age: Number,
  yearsEmployed: Number,
  jobcategory: ['A', 'B', 'C'],
  salary: Number
})


const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee;
