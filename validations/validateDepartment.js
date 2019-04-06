const Validator = require('validator');
const isEmpty = require('./is-empty');
const isCollegeEmail = require('./emailValidation/is-college-email');
const isHODEmail = require('./emailValidation/is-hod-email');

module.exports = (data) => {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.emailId = !isEmpty(data.emailId) ? data.emailId : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.repassword = !isEmpty(data.repassword) ? data.repassword : '';
  data.departmentName = !isEmpty(data.departmentName) ? data.departmentName : '';
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = 'firstName field is required';
  }
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = 'lastName field is required';
  }
  if(Validator.isEmpty(data.departmentName)) {
    errors.departmentName = 'departmentName field is required';
  }
  if (Validator.isEmpty(data.emailId)) {
    errors.emailId = 'Email field is required';
  }

  if (!Validator.isEmail(data.emailId)) {
    errors.emailId = 'Email is invalid';
  }
  if (!isHODEmail(data.emailId)) {
    errors.emailId = 'Email is invalid';
  }
  if(!isCollegeEmail(data.emailId)) {
    errors.emailId = 'Email does not belongs to the organization';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.repassword)) {
    errors.repassword = 'Confirm Password field is required';
  }

  if(Validator.isEmpty(data.departmentName)) {
    errors.departmentName = 'departmentName field is required';
  }
  if (!Validator.equals(data.password, data.repassword)) {
    errors.repassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}