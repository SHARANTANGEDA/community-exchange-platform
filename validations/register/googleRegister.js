const Validator = require('validator');
const isEmpty = require('../is-empty');
const isCollegeEmail = require('../emailValidation/is-college-email');
const isStudentEmail = require('../emailValidation/is-student-email');
const isHODEmail = require('../emailValidation/is-hod-email');
const isFacultyEmail = require('../emailValidation/is-faculty-email');

module.exports = (data,emailId) => {
  let errors = {},role;

  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.departmentName = !isEmpty(data.departmentName) ? data.departmentName : 'Choose Department';
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = 'lastName field is required';
  }
  if(!isCollegeEmail(emailId)) {
    errors.emailId = 'Email does not belongs to the organization';
  }

  if(isStudentEmail(emailId) && isCollegeEmail(emailId) && !isHODEmail(emailId) && !isFacultyEmail(emailId)) {
    role='student'
  }
  if(!isStudentEmail(emailId) && isCollegeEmail(emailId) && !isHODEmail(emailId) && isFacultyEmail(emailId)) {
    role='faculty'
  }
  if(!isStudentEmail(emailId) && isCollegeEmail(emailId) && isHODEmail(emailId) && !isFacultyEmail(emailId)) {
    role='hod'
  }


  if(Validator.equals(data.departmentName,'Choose Department')) {
    errors.departmentName = 'Please select your department'
  }
  return {
    errors,
    isValid: isEmpty(errors),
    role: role
  };
}