const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : '';
  data.tags = !isEmpty(data.tags) ? data.tags : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  //TODO Add validation for Image
  if(Validator.isEmpty(data.title)) {
    errors.title = 'Title Field is Required';
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = 'Status Field is Required';
  }
  if(Validator.isEmpty(data.tags)) {
    errors.tags = 'Adding tags will help other users to finad and answer your Question';
  }

  return{errors,
    isValid: isEmpty(errors)
  };
};
