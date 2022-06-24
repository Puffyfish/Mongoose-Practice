const mongoose = require('mongoose');
const {Schema} = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    lowercase: true,
    enum: ['fruit', 'vegetable', 'dairy', 'mushroom']
  },
  farm: {
    type: Schema.Types.ObjectID, // to display the owner of the products sold
    ref: 'Farm'
  }
})

// compile our model for export
const Product = mongoose.model('Product', productSchema)

// export model
module.exports = Product;
