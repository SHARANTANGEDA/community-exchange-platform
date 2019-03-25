const isStudentEmail = value => {
  let domain = '@hyderabad.bits-pilani.ac.in';
  let id = value.substr(0,value.length-domain.length);
  let pat=/\d+/
  let check = pat.test(id)

  return check;
}

module.exports = isStudentEmail;
