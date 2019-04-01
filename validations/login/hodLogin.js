const Validator = require('validator');
const isEmpty = require('../is-empty');
const isHODEmail = require('../emailValidation/is-hod-email');
const isCollegeEmail = require('../emailValidation/is-college-email')

module.exports = (data) => {
  let errors = {};
  data.emailId = !isEmpty(data.emailId) ? data.emailId : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.emailId)) {
    errors.emailId = 'Email is invalid';
  }
  if(!isCollegeEmail(data.emailId)) {
    errors.emailId='Please use organization email Address'
  }
  if(!isHODEmail(data.emailId)) {
    errors.emailId = 'Not HOD email Address, If not HOD please login from your section'
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