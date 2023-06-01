import mongoose from "mongoose";

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
  latestBalance: {
    type:Number,
    min: 0
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