const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
  let errors = {};
  data.taCourse = !isEmpty(data.taCourse) ? data.taCourse : '';
  if(Validator.isEmpty(data.taCourse)) {
    errors.taCourse = 'course Code is Required';
  }
  return{errors,
    isValid: isEmpty(errors)
  };
};
