import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const AssetSchema = new mongoose.Schema({
  symbol: { type: String, minLength: 1 },
  shares: { type: Number, min: 1 },
  avgPrice: { type: Number }
});

const TradeHistorySchema = new mongoose.Schema({
  symbol: { type: String, minLength: 1, required: true},
  action: { type: String, required: true },
  orderType: { type: String, required: true },
  shares: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  dollarPL: { type: Number },
  percentPL: { type: Number },
  orderDate: { type: String, required: true },
  status: { type: String, required: true }
});

const FollowSchema = {
  profile_id: {
    type: String
  },
  username: {
    type: String,
    minLength: 1
  },
  email: {
    type: String,
    minLength: 6
  }
}

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 6,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 6,
    required: true
  },
  username: {
    type: String,
    minLength: 1,
    required: true,
    unique: true
  },
  watchlist: [
    String
  ],
  purchasingPower: {
    type: Number,
    default: 10000000
  },
  latestBalance: {
    type:Number,
    min: 0,
    default: 10000000
  },
  holdings: [
    {type: AssetSchema}
  ],
  tradeHistory: [
    {type: TradeHistorySchema}
  ],
  followers: [
    {type: FollowSchema}
  ],
  following: [
    {type: FollowSchema}
  ]
});

// static signup method
ProfileSchema.statics.signup = async function (email, username, password) {
  // Validate that email and pw are not empty strings
  if (!email || !password) {
    throw Error('All feilds must be filled');
  }
  // Validate email
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  // Validate that pw is a strong pw
  if (password.length < 6) {
    throw Error('Password must be at least 6 characters');
  }

  // Ensure email provided is not already in use
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('This email is already in use');
  }

  // Ensure username provided is not already in use
  const userNameExists = await this.findOne({username});
  if (userNameExists) {
    throw Error('This username is already in use');
  }

  // Generate a salt (a random string to concat to password)
  const salt = await bcrypt.genSalt(10);
  // Hash the password and salt together
  const hash = await bcrypt.hash(password, salt);

  // Create the document on the database
  const user = await this.create({ email, username, password: hash });

  return user;
}

// static login method
ProfileSchema.statics.login = async function (email, password) {
  // Validate that email and pw are not empty strings
  if (!email || !password) {
    throw Error('All feilds must be filled');
  }

  // Check if the email exists in the database
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  // Email exists, now validate if given password matches hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
}

const ProfileModel = mongoose.model('Profile', ProfileSchema);
export default ProfileModel;

// Test Profile Model
/*
let steven = new ProfileModel({
  email: 's@t.com',
  username: 'stk',
  watchlist: ['CRMD', 'BBAI', 'SOUN'],
  holdings: [
    {symbol: 'TSLA', shares: 1000, avgPrice: 185.01 * 100},
    {symbol: 'SOUN', shares: 13000, avgPrice: 2.05 * 100},
  ]
})

console.log(steven);
*/