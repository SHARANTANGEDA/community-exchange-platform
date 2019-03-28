const isAdminEmail = value => {
  return (value === 'archeus') || (value === 'godView');
}

module.exports = isAdminEmail;
