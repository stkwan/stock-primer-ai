import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  symbol: { type: String, minLength: 1 },
  shares: { type: Number, min: 1 },
  avgPrice: { type: Number }
});

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 6,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 10,
    required: true
  },
  username: {
    type: String,
    minLength: 1,
    required: true,
    unique: true
  },
  watchlist: [{
    type: String,
    minlength: 1
  }],
  purchasingPower: {
    type: Number,
    default: 2500000
  },
  holdings: [
    {type: AssetSchema}
  ]
});

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