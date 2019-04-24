const isAdminEmail = value => {
  return (value==='archeus@hyderabad.bits-pilani.ac.in') || (value==='darthCoffee@hyderabad.bits-pilani.ac.in') ||
    (value==='baswath@hyderabad.bits-pilani.ac.in') || (value==='rohan@hyderabad.bits-pilani.ac.in')
    || (value==='dheeru@hyderabad.bits-pilani.ac.in') || (value==='seic@hyderabad.bits-pilani.ac.in');
}

module.exports = isAdminEmail;
