// import UserModel
import UserModel from '../../../models/userModel.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res, next) => {
  const {email, password} = req.body;

  try {
    const user = await UserModel.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signUpUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.signup(email, password);
    
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });

  } catch(error) {
    res.status(400).json({ error: error.message});
  }
};

export { loginUser, signUpUser }


// Notes
// Hash passwords before saving on database 
// in order to increase security in case of data breech