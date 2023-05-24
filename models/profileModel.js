import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  symbol: { type: String, minLength: 1 },
  shares: { type: Number, min: 1 },
  avgPrice: { type: Number }
});

const TradeHistorySchema = new mongoose.Schema({
  symbol: { type: String, minLength: 1},
  action: { type: String },
  orderType: { type: String },
  shares: { type: Number},
  price: { type: Number},
  total: {type: Number},
  dollarPL: { type: Number },
  percentPL: { type: Number },
  orderDate: { type: String },
  status: { type: String }
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
  watchlist: [
    String
  ],
  purchasingPower: {
    type: Number,
    default: 2500000
  },
  holdings: [
    {type: AssetSchema}
  ],
  tradeHistory: [
    {type: TradeHistorySchema}
  ],
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