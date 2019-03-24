const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  // data.skills = !isEmpty(data.skills) ? data.skills : '';
  // if (Validator.isEmpty(data.skills)) {
  //   errors.skills = 'Skills field is required';
  // }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.codeForces)) {
    if (Validator.isEmpty(data.codeForces)) {
      errors.codeForces = 'Not a valid handle';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
