const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
  let errors = {};
  data.courseCode = !isEmpty(data.courseCode) ? data.courseCode : '';
  data.courseName = !isEmpty(data.courseName) ? data.courseName : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  if(Validator.isEmpty(data.courseCode)) {
    errors.courseCode = 'course Code is Required';
  }
  if(Validator.isEmpty(data.courseName)) {
    errors.courseName = 'Course Name is Required';
  }
  if(Validator.isEmpty(data.bio)) {
    errors.bio = 'Description about the course is Required';
  }

  return{errors,
    isValid: isEmpty(errors)
  };
};
