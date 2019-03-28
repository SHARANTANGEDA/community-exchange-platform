const Validator = require('validator');
const isEmpty = require('../is-empty');
const isAdminEmail = require('../emailValidation/is-admin-email');

module.exports = (data) => {
  let errors = {};
  data.emailId = !isEmpty(data.emailId) ? data.emailId : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!isAdminEmail(data.emailId)) {
    errors.emailId = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if(Validator.isEmpty(data.emailId)) {
    errors.emailId = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}