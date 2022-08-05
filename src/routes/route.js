const express = require('express');
const abc = require('../introduction/intro');
const  add = require('../logger/logger');
const newadd =require('../util/helper');
const ok=require('../validator/formatter')
const router = express.Router();

router.get('/test-you', function (req, res) {
    add.welcome()
    newadd.Printdate()
    newadd.Printmonth()
    newadd.getBatchInfo()
    console.log("withTirm===>"+ok.itrim.trim())
    console.log("withoutTirm===>"+ok.otrim)
    console.log("HardCorded string===>"+ok.case)
    console.log("UpperCase===>"+ok.ucase)
    console.log("Lower Case===>"+ok.lcase)
    res.send('This is My First ever api!')
});
router.get('/test-you', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/test-you', function (req, res) {
    res.send('Hi  i am sameer')

});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){
 
})
module.exports = router;
// adding this comment for no reason