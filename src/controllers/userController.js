const User = require('../models/userModel');

// CREATE a new user
const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(req.body)
    const result = await User.create({
      email:email,
      password:password,
      role:role
    }) 
    res.status(201).json({ message: 'User created successfully', result });
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// READ a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// UPDATE user by ID
const updateUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, password, role },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// DELETE user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
