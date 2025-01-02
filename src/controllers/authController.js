const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  // User model
const Organization = require('../models/organizationModel'); // Organization model
const {sendResponse} = require('../utils/responseHelper')

// SignUp Controller (No Token Generated here)
const signUp = async (req, res) => {
    try {
      const { email, password, role, organizationName } = req.body;
  
      // Validate role
      const validRoles = ['Admin', 'Editor', 'Viewer'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let organizationId = null;
  
      // If role is 'admin' or 'editor', create an organization
      if (role === 'admin' || role === 'editor') {
        const newOrganization = await Organization.create({
          name: organizationName,
          createdBy: null, // This will be updated after the user is created
        });
        organizationId = newOrganization._id;
      }
  
      // Create a new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        role,
        organization: organizationId,
      });
  
      // If the user is 'admin', update the createdBy field in the organization
      if (role === 'admin') {
        await Organization.findByIdAndUpdate(organizationId, {
          createdBy: newUser._id,
        });
      }
      sendResponse(res, 201,   'User created successfully', null);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

// Login Controller (Token Generated here)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },  // Payload
      process.env.JWT_SECRET,  // Secret key
      { expiresIn: '1h' }      // Expiry time (1 hour)
    );

    // Send the token to the user
    return res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const logout = async (req, res) => {
    try {
      // Inform the client to remove the token (invalidate it)
      return res.status(200).json({ message: 'Logged out successfully. Please remove the token on the client side.' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Server error during logout' });
    }
};

module.exports = { signUp, login , logout };
