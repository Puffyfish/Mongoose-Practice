// *** This is an example of ONE TO FEW relationship in mongodb
{ name: 'Tommy Cash',
  savedAddresses: [
    {street: 'rahukohtu 3', city: 'Tallinn', country: 'Estonia'},
    {street: 'Ravala 5', city: 'Tallinn', country: 'Estonia'}
  ]}

const mongoose = require('mongoose');

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

const userSchema = new mongoose.Schema ({
  first: String,
  last: String,
  addresses: [
    {
      _id: {id: false},
      street: String,
      city: String,
      state: String,
      country: String
  }]
})

const User = mongoose.model('User', userSchema);

// to make a new user
const makeUser = async () => {
  const u = new User ({
    first: 'Harry',
    last: 'Potter'
  })
  u.addresses.push({
    street: '123 Sesame St.',
    city: 'New York',
    state: 'New York',
    country: 'USA'
  })
  const res = await u.save()
  console.log(res);
}

// to add an address to an existing user

const addAddress = async(id) => {
  const user = await User.findById(id);
  user.addresses.push(
    {
      street: '99 3rd St.',
      city: 'New York',
      state: 'New York',
      country: 'USA'
    }
  )
  const res = await user.save()
  console.log(res);
};

addAddress('62b459cbb7038c736aa3d9f9');
