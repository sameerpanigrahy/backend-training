const express = require('express');
const router = express.Router();

const AuthorController=require("../controllers/authorController")
const BookController= require("../controllers/bookController");
const Pubcontroller= require('../controllers/pubController');
const MiddleC=require('../middleware/middleware')



router.post("/creatAuthor", AuthorController.createAuthor  )
router.post("/creatPub", Pubcontroller.createPubli )

router.post("/createBook", BookController.createBook  )
router.get("/getbook",BookController.getbook)
router.put("/updatec",BookController.updateBook)
router.put("/updatep",BookController.updateBookA)

//findAuthorId//findAuthor

module.exports = router;