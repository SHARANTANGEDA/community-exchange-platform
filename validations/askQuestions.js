const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : '';
  data.tags = !isEmpty(data.tags) ? data.tags : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.course = !isEmpty(data.course) ? data.course : 'Choose Course';
  //TODO Add validation for Image
  if(Validator.isEmpty(data.title)) {
    errors.title = 'Title Field is Required';
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = 'Description Field is Required';
  }
  if(Validator.isEmpty(data.tags) || Validator.equals(data.tags,',')) {
    errors.tags = 'Adding tags will help other users to find and answer your Question';
  }

  return{errors,
    isValid: isEmpty(errors)
  };
};
