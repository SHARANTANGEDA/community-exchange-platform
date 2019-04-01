const Validator = require('validator');
const isEmpty = require('../is-empty');
const isCollegeEmail = require('../emailValidation/is-college-email');
const isStudentEmail = require('../emailValidation/is-student-email');

module.exports = (data) => {
  let errors = {};
  data.emailId = !isEmpty(data.emailId) ? data.emailId : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.emailId) || !isCollegeEmail(data.emailId) || !isStudentEmail(data.emailId)) {
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