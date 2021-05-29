const profileFields = ['name', 'content'];
const getDocumentErrors = (err) => {
  const errorsArray = [];
  console.table(err.errors);
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
