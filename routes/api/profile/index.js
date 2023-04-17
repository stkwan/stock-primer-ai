import express from 'express';
import {
  createProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile } from './handlers.js';

const router = express.Router();

// Create a new profile
router.post('/new', createProfile);

// Get all profiles
router.get('/all', getAllProfiles);

// Get a profile
router.get('/:id', getProfile);

// Update a profile
router.patch('/:id', updateProfile);

// Delete a profile
router.delete('/:id', deleteProfile);

export default router;