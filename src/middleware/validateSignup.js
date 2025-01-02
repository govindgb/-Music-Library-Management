const { body, validationResult } = require('express-validator');

// Middleware to validate signup data
exports.validateSignup = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['Admin', 'Editor', 'Viewer'])
    .withMessage('Role must be one of admin, editor, or user'),
  body('organizationName')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Organization name must be at least 3 characters long'),

  // Check if there are validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
