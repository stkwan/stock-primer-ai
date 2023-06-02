import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    requried: true,
  }
});

// static signup method
userSchema.statics.signup = async function(email, password) {
  // Validate that email and pw are not empty strings
  if (!email || !password) {
    throw Error('All feilds must be filled');
  }
  // Validate email
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  // Validate that pw is a strong pw
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  // Ensure email provided is not already in use
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('This email is already in use');
  }
  
  // Generate a salt (a random string to concat to password)
  const salt = await bcrypt.genSalt(10);
  // Hash the password and salt together
  const hash = await bcrypt.hash(password, salt);

  // Create the document on the database
  const user = await this.create({ email, password: hash});

  return user;
}

// static login method
userSchema.statics.login = async function(email, password) {
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

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

// Notes
// Use bcrypt package (npm install bcrypt) to hash password
// before saving to database.
// Use validator package (npm install validator) to validate user inputs
