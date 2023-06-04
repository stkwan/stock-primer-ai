import jwt from 'jsonwebtoken';
import ProfileModel from '../models/profileModel.js';

const requireAuth = async (req, res, next) => {

  // verify authentication
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1];
  
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await ProfileModel.findOne({_id}).select(_id);

    return next();

  } catch (error) {
    console.log(error);
    res.status(401).json({error: error.message})
  }

}

export default requireAuth;