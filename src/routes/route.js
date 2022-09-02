const express = require('express');
const router = express.Router();

const cowinController= require('../controllers/cowinController');
const weatherController=require('../controllers/weatherController')
const memes=require('../controllers/memesController')

//.......................................................................................................//


router.get("/cowin/getState",cowinController.getState)
router.get("/cowin/getDstrict/:stateId",cowinController.getDistricts)
router.get("/cowin/appointmentBydstrict",cowinController.appointmentBydstrict)
router.get("/cowin/appointmentByPin",cowinController.appointmentBypin)


//...........................................................................................................//
router.get("/getWeather",weatherController.getWeather)
router.get("/getAllWeather",weatherController.getAllTemp)


//................................................................................................//

router.get("/getmems",memes.getmemes)
router.post("/createMems",memes.creatMemes)






module.exports = router;   