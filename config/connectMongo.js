import mongoose from "mongoose";

const connectMongo = async function() {
  try {
    await mongoose.connect(process.env.mongoAuthString);
    return Promise.resolve('Connected to MongoDB');
  } catch(err) {
    return Promise.reject(err);
  }
};

export default connectMongo;