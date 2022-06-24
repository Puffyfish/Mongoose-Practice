// *** This is an example of one to many relationship in mongodb
// *** one to many : farm to multiple products(showing only objectID)
// *** Example: {farmName: 'Full Belly Farms',
        // location: 'Guinda, CA',
        // produce: [
        //   ObjectID('2189829842198'),
        //   ObjectID('oetqutqo13241'),
        //   ObjectID('fawoteiwa2424')
        // ]}

const mongoose = require('mongoose');
const {Schema} = mongoose; // {} means to destructure it from mongoose.schema

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Mongo connection open!');
  })
  .catch(err => {
    console.log('Oh no Mongo connection error!')
    console.log(err)
  })

const productSchema = new mongoose.Schema ({
  name: String,
  price: Number,
  season:
    {
      type: String,
      enum: ['Spring', 'Summer', 'Fall', 'Winter']
  }
});

const farmSchema = new mongoose.Schema ({
  name: String,
  city: String,
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}] // to specify that this is an objectID type
  // 'ref' makes it easy to populate the 'source'
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema)
// Product.insertMany([
//   {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Sugar Baby Watermelon', price: 5.50, season: 'Summer'},
//       {name: 'Asparagus', price: 3.99, season: 'Spring'}
// ]
// )



// const makeFarm = async () => {
//   const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA'});
//   const melon = await Product.findOne({ name: 'Goddess Melon'});
//   farm.products.push(melon)
//   await farm.save()
//   console.log(farm)
// }
//
// makeFarm();

const addProduct = async(id) => {
  const farm = await Farm.findOne({ name: 'Full Belly Farms'});
  const watermelon = await Product.findOne({name: 'Sugar Baby Watermelon'});
  farm.products.push(watermelon)
  const res = await farm.save()
  console.log(res);
};

addProduct();
