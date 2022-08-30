const express = require('express');
const router = express.Router();

const usercontroller= require('../controllers/userController');
const Middle=require('../middleware/middleware')



router.post("/createuser", usercontroller.createuser )
router.post("/logginuser",usercontroller.logginuser )

router.get("/getuser/:userId",Middle.authenticate,Middle.authorization, usercontroller.getuser  )

router.put("/updateuser/:userId",Middle.authenticate, usercontroller.updateuser  )
router.delete("/deleteuser/:userId",Middle.authenticate, usercontroller.deleteuser)
module.exports = router;   