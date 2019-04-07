const Validator = require('validator');
const isEmpty = require('../is-empty');
const isFacultyEmail = require('../emailValidation/is-faculty-email');
const isCollegeEmail = require('../emailValidation/is-college-email')
const isHODEmail = require('../emailValidation/is-hod-email');

module.exports = (data) => {
  let errors = {};
  data.emailId = !isEmpty(data.emailId) ? data.emailId : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.emailId)) {
    errors.emailId = 'Email is invalid';
  }
  if(!isFacultyEmail(data.emailId)) {
    errors.emailId = 'Not HOD email Address, If not HOD please login from your section'
  }
  if(!isCollegeEmail(data.emailId)) {
    errors.emailId='Please use organization email Address'
  }
  if(isHODEmail(data.emailId)) {
    errors.emailId='Please use faculty emailAddress this is hod email'
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