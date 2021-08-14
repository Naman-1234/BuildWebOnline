const profileFields = ['name', 'phoneNo', 'gender', 'email', 'password'];
const getErrors = (err) => {
  const errorsArray = [];
  //More code just like getDocumentErrors can be added here if Error handling is required
  //in profile section.
  return errorsArray;
};
module.exports = {
  getErrors,
};
