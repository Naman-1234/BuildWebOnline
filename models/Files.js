const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'untitled',
      trim: true,
      required: [true, 'Name is required'],
      unique: true,
    },
    content: {
      type: String,
      default: `<html>
        <style></style>
        <script></script>
        </html>`,
    },
    //Because owner will be _id, hence taking its type to be ObjectId,
    //Also owner is kind of acting as a foreign key here or virtual key more precisely,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

fileSchema.statics.getAllDocuments = async (id) => {
  const allDocuments = await File.find({
    owner: id,
  });
  return allDocuments;
};
const File = new mongoose.model('File', fileSchema);
module.exports = File;
