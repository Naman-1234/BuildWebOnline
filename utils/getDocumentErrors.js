const profileFields = ['name', 'content'];
const getDocumentErrors = (err) => {
  const errorsArray = [];
  // This checks the field present in the profileFields array and
  //  if there is any error associated with those fields.
  profileFields.map((field) => {
    if (err.errors && err.errors[field]) {
      errorsArray.push(err.errors[field].message);
    }
  });
  return errorsArray;
};
module.exports = {
  getDocumentErrors,
};
