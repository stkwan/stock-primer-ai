import express from 'express';
import mongoose from 'mongoose';
import ProfileModel from '../../../models/profileModel.js';

const router = express.Router();

// Create a new profile
router.post('/new', async (req, res, next) => {
  if (!req.body.email || !req.body.username) {
    res.json({error: 'Email and username are required'})
  }

  try {
    const newProfile = await ProfileModel.create(req.body);
    return res.json(newProfile);
  } catch(error) {
    return res.json({error: error.message});
  }
});

// Get a profile
router.get('/:id', (req, res, next) => {
  res.send(`Get profile with id: ${req.params.id}`);
});

// Update a profile
router.patch('/:id', (req, res, next) => {
  res.send(`Update a profile with id: ${req.params.id}`);
});

// Delete a profile
router.delete('/:id', (req, res, next) => {
  res.send(`Delete profile with id ${req.params.id}`)
});

export default router;