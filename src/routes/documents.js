const router = require("express").Router();
const auth = require("../middlewares/auth");
const File = require("../models/Files");
const mongoose = require("mongoose");
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
      .then((result) => {
        console.log("SUccess", result);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(201).send(file);
  } catch (error) {
    res.status(500).send(`Got an error ${error}`);
  }
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const document = await File.findOne({
    _id: id,
  });
  res.status(200).send(document);
});

router.get("/", auth, async (req, res) => {
  const user = req.user || {
    name: "Naman Kalra",
    _id: "609686528941121e202ce907",
    phoneNo: "9817636188",
    gender: "Male",
    email: "namankalrabhiwani54@gmail.com",
    __v: 4,
  };
  const id = user._id.toString();
  const allDocuments = await File.getAllDocuments(id);
  res.status(200).send(allDocuments);
});
module.exports = router;
