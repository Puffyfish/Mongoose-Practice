const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  birthdate: String,
  jobcategory: String,
  salary: Number
})


const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee;
