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

const userSchema = new Schema ({
    username: String,
    age: Number
  });

const tweetSchema = new Schema ({
  text: String,
  likes: Number,
  user: {type: Schema.Types.ObjectID, ref: 'User'}
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async() => {
//   // const user = new User({ username: 'chickenfan99', age: 61});
//   const user = await User.findOne({ username: 'chickenfan99'});
//   // const tweet1 = new Tweet({ text: 'omg I love my chicken family', likes: 321});
// const tweet2 = new Tweet({ text: 'bok bok my chickens make noises', likes: 423});
//   // tweet1.user = user;
//   tweet2.user = user; //to save a new tweet to the SAME user
//   // user.save();
//   const res = await tweet2.save();
//   console.log(res);
// }
//
// makeTweets();

const findTweet = async() => {
  // const t = await Tweet.findOne({}) // displays just the ObjectID
  // const t = await Tweet.findOne({}).populate('user') //display the user's info
  const t = await Tweet.findOne({}).populate('user', 'username') // displays ONLY the user's username
  console.log(t);
}

findTweet();
