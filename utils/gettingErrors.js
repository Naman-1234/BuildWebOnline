const profileFields = ['name', 'phoneNo', 'gender', 'email', 'password'];
const getErrors = (err) => {
  const errorsArray = [];
  profileFields.map((field) => {
    if (err.errors[field]) {
      errorsArray.push(err.errors[field].message);
    }
  });
  return errorsArray;
};
module.exports = {
  getErrors,
};
