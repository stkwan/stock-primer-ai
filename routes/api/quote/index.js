import express from 'express';
import getQuoteInfo from './handlers.js';
const router = express.Router();

router.get('/:sym', getQuoteInfo);

export default router;