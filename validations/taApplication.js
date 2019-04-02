const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
  let errors = {};
  data.courseCode = !isEmpty(data.courseCode) ? data.courseCode : 'Choose Course';

  if(Validator.equals(data.courseCode,'Choose Course')) {
    errors.courseCode = 'Please select the Course'
  }
  return{errors,
    isValid: isEmpty(errors)
  };
};
