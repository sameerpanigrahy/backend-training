const express = require('express');
const router = express.Router();
const { authentication, authorisation }=require('../middleware/auth.js')
const { createUser, getuserById ,loginUser} = require('../controllers/userController')




//..............................Test API.........................//

router.get("/test-me" , function(req,res){
    res.status(200).send({status:true,message:"Testing API"})
})


//........................................User API............................................//

router.post('/register', createUser)


router.get("user/:userId/profile",authentication,getuserById)

router.post('/login', loginUser)



//  router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })



module.exports = router