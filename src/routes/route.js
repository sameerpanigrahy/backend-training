const express = require('express');
const _ = require('underscore')
const lodash=require('lodash')

const abc = require('../introduction/intro')
const loggerModule = require('../logger/logger.js')
const formatterModule = require('../validator/formatter') 
const helperModule = require('../util/helper')
const router = express.Router();

// router.get('/test-me', function (req, res) {
//     console.log('My batch is', abc.name)
//     abc.printName()
//     loggerModule.printInfo()
//     formatterModule.trimMyString()
//     formatterModule.getUpperCaseString()
//     formatterModule.changetoLowerCase()
//     helperModule.getTodaysDate()
//     helperModule.getCurrentMonth()
//     helperModule.printBatchDetails()
//     let weekdend = ['Saturday','Sunday','Monday']
//     let result = _.first(weekdend, 2)
//     console.log('Unserscore example resultr is ',result)
//     res.send('My second ever api!')
// });
router.get('/test-me', function(req, res){
     const months=['jan','fab','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
     let result=lodash.chunk(months,3)
     res.send(result);
     console.log(result);
     const array=[1,3,5,7,9,11,13,15,17,19]
       let tail=lodash.tail(array)
     console.log(tail)
     res.send(tail)
    const duplicate=[[1,2,3,4,5],[2,7,3,8,9],[9,0,4,2,3],[1,3,2,5,10],[1,34,2,5,11]]
    const [a,b,c,d,e]=duplicate
    let sam=lodash.union(a,b,c,d,e)
    console.log(sam)
    res.send(sam)
     const oarray=[['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
    let object=lodash.fromPairs(oarray)
    console.log(object)
     res.send(object)
})

router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason