const { Router } = require('express');
const express = require('express');
const router = express.Router();
const handler=require('../controler/controler')
//const UserModel = require("../models/usermodel");


router.post('/createbook', handler.saveData )
router.get('/fetchbook', handler.fetchData)


module.exports = router;