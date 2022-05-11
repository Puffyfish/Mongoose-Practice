const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  price: Number,
  age: Number,
  category: {
    type: String,
    enum: ['Dog', 'Cat', 'Fish', 'Bird']
  }
})

const Pet = mongoose.model('Pet', petSchema)

// export model
module.exports = Pet;
