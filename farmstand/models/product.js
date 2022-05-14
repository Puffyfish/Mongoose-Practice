const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true,
    min: 0
  },
  category: {
    type: String,
    lowercase: true,
    enum: ['fruit', 'vegetable', 'dairy', 'mushroom']
  }
})

// compile our model for export
const Product = mongoose.model('Product', productSchema)

// export model
module.exports = Product;
