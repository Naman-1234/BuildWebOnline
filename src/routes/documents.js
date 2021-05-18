const router = require("express").Router();
const auth = require("../middlewares/auth");
const File = require("../models/Files");
const mongoose = require("mongoose");

//For Getting all documents
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    //Since the _id is of the form mongoose.Schema.Types.ObjectId
    //We need to convert it into string first.
    const id = user._id.toString();
    const allDocuments = await File.getAllDocuments(id);
    res.status(200).send(allDocuments);
  } catch (err) {
    res.status(500).send(new Error(err));
  }
});

//To Get a Particular Document
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  //Mongoose does the work of converting _id into string
  const document = await File.findOne({
    _id: id,
  });
  res.status(200).send(document);
});

router.delete("/", auth, async (req, res) => {
  console.log("Inside delete router");
  try {
    const id = req.params.id || "60a4181c7868df32a80dd18a";
    const deleteFile = await File.deleteOne({
      _id: id,
    });
    await File.save();
    res.send(201).send("Successfully deleted");
  } catch (e) {
    res.status(404).send(e);
  }
});
//For Adding Document
router.post("/add", auth, async (req, res) => {
  try {
    const user = req.user;
    const id = user._id.toString();
    const { name, content } = req.body;
    const file = new File({
      name: name,
      content: content,
      owner: id,
    });

    file
      .save()
      .then((result) => {})
      .catch((err) => {
        throw new Error(err);
      });
    res.status(201).send(file);
  } catch (error) {
    res.status(500).send(new Error(err));
  }
});

module.exports = router;
