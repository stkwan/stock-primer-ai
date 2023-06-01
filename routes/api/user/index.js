import express from 'express';
// controlller functions
import { loginUser, signUpUser } from './handlers.js';

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signUpUser);

export default router;
