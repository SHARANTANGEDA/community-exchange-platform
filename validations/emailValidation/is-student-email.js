const isStudentEmail = value => {
  let domain = '@hyderabad.bits-pilani.ac.in';
  let id = value.substr(1,value.length-domain.length);
  let pat=/\d+/
  return pat.test(id);
}

module.exports = isStudentEmail;
