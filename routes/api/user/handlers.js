// import UserModel
import UserModel from '../../../models/userModel.js';

// login user
const loginUser = async (req, res, next) => {
  res.json({msg: 'login user'});
};

// signup user
const signUpUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.signup(email, password);

    res.status(200).json({ email, user });

  } catch(error) {
    res.status(400).json({ error: error.message});
  }
};

export { loginUser, signUpUser }


// Notes
// Hash passwords before saving on database 
// in order to increase security in case of data breech