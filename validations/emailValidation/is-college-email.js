const isCollegeEmail = value => {
  let domain = '@hyderabad.bits-pilani.ac.in';
  let email_sub = value.slice(-domain.length);

  return (value.length>=domain.length) && (domain === email_sub);
}

module.exports = isCollegeEmail;
