// not recommended to have an id of the products here
// and also id of the farm over to the productsSchema
// but if it makes sense since we want to see the products here and vise verse, hence the mongodb relationship we have here

const mongoose = require('mongoose');
const {Schema} = mongoose;

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Farm must have a name!']
  },
  city: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: [true, 'Email required']
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
})

// compile our model for export
const Farm = mongoose.model('Farm', farmSchema)

// export model
module.exports = Farm;
