const Validator = require('validator');
const isEmpty = require('../is-empty');
const isCollegeEmail = require('../emailValidation/is-college-email');
const isStudentEmail = require('../emailValidation/is-student-email');
module.exports = (data) => {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.emailId = !isEmpty(data.emailId) ? data.emailId : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.repassword = !isEmpty(data.repassword) ? data.repassword : '';
  data.departmentName = !isEmpty(data.departmentName) ? data.departmentName : 'Choose Department';
  if (!Validator.isLength(data.firstName ,{min: 2, max: 30})) {
    errors.firstName = 'Name must be between 2 and 30 characters';
  }
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = 'firstName field is required';
  }
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = 'lastName field is required';
  }
  if (Validator.isEmpty(data.emailId)) {
    errors.emailId = 'Email field is required';
  }

  if (!Validator.isEmail(data.emailId)) {
    errors.emailId = 'Email is invalid';
  }
  if(!isCollegeEmail(data.emailId)) {
    errors.emailId = 'Email does not belongs to the organization';
  }
  if(!isStudentEmail(data.emailId)) {
    errors.emailId = 'Please use student email, If you are not student login from your section'
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

  if (!Validator.equals(data.password, data.repassword)) {
    errors.repassword = 'Passwords must match';
  }
  if(Validator.equals(data.departmentName,'Choose Department')) {
    errors.departmentName = 'Please select your department'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}