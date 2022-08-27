const express = require('express');
const router = express.Router();

const usercontroller= require('../controllers/userController');
const Middle=require('../middleware/middleware')



router.post("/createuser", usercontroller.createuser )
router.post("/logginuser",usercontroller.logginuser )

router.get("/getuser/:userId",Middle.middleware, usercontroller.getuser  )

router.put("/updateuser/:userId",Middle.middleware, usercontroller.updateuser  )
router.delete("/deleteuser/:userId",Middle.middleware, usercontroller.deleteuser)
module.exports = router;   