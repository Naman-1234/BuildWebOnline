const multer = require('multer');

//Setting file size limit to be 5 MB at max
let regex = '.(jpg|jpeg|png)$';
const UserProfileUpload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(regex)) {
      return cb(new Error('Only png, jpeg or jpg images are allowed'));
    }
    cb(undefined, true);
  },
});

module.exports = UserProfileUpload;
