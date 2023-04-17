import mongoose from 'mongoose';
import ProfileModel from '../../../models/profileModel.js';

// Create a new profile
const createProfile = async function(req, res, next) {
  if (!req.body.email || !req.body.username) {
    return res.json({ error: 'Email and username are required' })
  }

  try {
    const newProfile = await ProfileModel.create(req.body);
    return res.json(newProfile);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// Get all profiles
const getAllProfiles = async function(req, res, next) {
  try {
    const allProfiles = await ProfileModel.find();
    if (!allProfiles || allProfiles.length < 1) {
      return res.json('There are no profiles');
    }
    return res.json(allProfiles);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// Get a single profile
const getProfile = async function(req, res, next) {
  const id = req.params.id;

  try {
    const profile = await ProfileModel.findById(id);
    if (!profile) {
      throw Error('Profile does not exist');
    }
    return res.json(profile);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// Update a profile
const updateProfile = async function(req, res, next) {
  const updatedEmail = req.body.email;
  const updatedUsername = req.body.username;
  const id = req.params.id;

  const sameEmail = await ProfileModel.findOne({ email: updatedEmail });
  if (sameEmail) {
    return res.json({ error: 'A profile with this email already exists' });
  }

  const sameUsername = await ProfileModel.findOne({ username: updatedUsername });
  if (sameUsername) {
    return res.json({ error: 'A profile with this username already exists' });
  }

  try {
    const profile = await ProfileModel.findByIdAndUpdate(id, req.body);
    if (!profile) {
      throw Error('Profile does not exisit');
    }
    return res.json(profile);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// Delete a profile
const deleteProfile = async function(req, res, next) {
  const id = req.params.id;
  try {
    const profile = await ProfileModel.findByIdAndDelete(id);
    if (!profile) {
      throw Error('Profile does not exist');
    }
    return res.json(profile);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export { createProfile, getAllProfiles, getProfile, updateProfile, deleteProfile };
