// import ProfileModel
import ProfileModel from '../../../models/profileModel.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res, next) => {
  const {email, password} = req.body;

  try {
    const user = await ProfileModel.login(email, password);

    // create a token
    const token = createToken(user._id);
    const id = user._id;
    const username = user.username;
    const followers = user.followers;
    const following = user.following;

    res.status(200).json({ email, id, username, followers, following, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signUpUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const user = await ProfileModel.signup(email, username, password);

    // create a token
    const token = createToken(user._id);
    const id = user._id;
    const username = user.username;
    const followers = user.followers;
    const following = user.following;

    res.status(200).json({ email, id, username, followers, following, token });

  } catch(error) {
    res.status(400).json({ error: error.message});
  }
};

export { loginUser, signUpUser }


// Notes
// Hash passwords before saving on database 
// in order to increase security in case of data breech