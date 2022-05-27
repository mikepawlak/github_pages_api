//Validation for contact form

const { check } = require('express-validator');

const validateForm = [
  //name
  check('name')
    .isLength({min:1}).withMessage('Name is required'),
  //company
    //no validation
  //email
  check('email')
    .isLength({min:1}).withMessage('Email is required')
    .isEmail().withMessage('Email is not valid'),
  //subject
    //no validation
  //message
  check('message')
    .isLength({min:1}).withMessage('Message is required')
];

 module.exports = validateForm;
