const isHodEmail = value => {
  let domain = '@hyderabad.bits-pilani.ac.in';
  let id = value.substr(0,value.length-domain.length);
  let check = false
  let dot = id.indexOf('.');
  if(dot===-1) {
    check=false;
  }else {
    let hod = id.substr(0,3);
    check = (hod === 'hod') && (dot === 3);
  }

  return check;
}

module.exports = isHodEmail;
