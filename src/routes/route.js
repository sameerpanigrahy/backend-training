const express = require('express');
const router = express.Router();

const orderController=require("../controllers/orderController")
const productController= require("../controllers/productController");
const usercontroller= require('../controllers/userController');
const MiddleC=require('../middleware/middleware')



router.post("/createuser",MiddleC.middleware, usercontroller.createuser )
router.post("/createOrder",MiddleC.middleware,orderController.createOrder )

router.post("/createProduct", productController.createProduct  )



module.exports = router;