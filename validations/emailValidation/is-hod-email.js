const isHodEmail = value => {
  let hodList = ['bio.office@hyderabad.bits-pilani.ac.in'
    ,'hod.chemistry@hyderabad.bits-pilani.ac.in'
  ,'mech.dept@hyderabad.bits-pilani.ac.in'
    ,'pharma@hyderabad.bits-pilani.ac.in',
  'hod.physics@hyderabad.bits-pilani.ac.in'
    ,'hod.chemical@hyderabad.bits-pilani.ac.in',
  'hodcivil@hyderabad.bits-pilani.ac.in'
    ,'hod-cse@hyderabad.bits-pilani.ac.in',
    'hod.ecofin@hyderabad.bits-pilani.ac.in',
  'eee.office@hyderabad.bits-pilani.ac.in',
    'hod.maths@hyderabad.bits-pilani.ac.in',
    'hod.humanities@hyderabad.bits-pilani.ac.in',
  'hod.test@hyderabad.bits-pilani.ac.in','hod.test2@hyderabad.bits-pilani.ac.in',
  'hod.tee@hyderabad.bits-pilani.ac.in']

  let num = hodList.indexOf(value);
  return num !== -1;

}

module.exports = isHodEmail;
