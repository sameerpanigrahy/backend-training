const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const AuthorController=require("../controllers/authorController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/creatAuthor", AuthorController.createAuthor  )

router.get("/findAuthorId", AuthorController.findAuthorId )
router.get("/Update", AuthorController.upDate )
router.get("/findAuthor",AuthorController.findAuthor)

router.post("/createBook", BookController.createBook  )

//findAuthorId//findAuthor

module.exports = router;