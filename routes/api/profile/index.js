import express from 'express';
import {
  createProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile } from './handlers.js';
import requireAuth from '../../../middleware/requireAuth.js';

const router = express.Router();

// Ensure the user is authenticated (logged in) before allowing access to below routes
router.use(requireAuth);

// Create a new profile
//router.post('/new', createProfile);

// Get all profiles
router.get('/all', getAllProfiles);

// Get a profile
router.get('/:id', getProfile);

// Update a profile
router.patch('/:id', updateProfile);

// Delete a profile
router.delete('/:id', deleteProfile);

export default router;