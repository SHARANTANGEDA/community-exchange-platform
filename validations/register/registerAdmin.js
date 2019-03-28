const Validator = require('validator');
const isEmpty = require('../is-empty');


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

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}