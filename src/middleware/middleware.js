const moment=require('moment');
let jwt = require('jsonwebtoken');



const middleware= function(req,res,next){
   let  keya=req.headers["x-auth-token"]
   let  keyb=req.headers["x-Auth-token"]
    
    if(!keya&&!keyb){
      return  res.send({msg:"The request is missing a mandatory header"})
    }
    let decodedToken = jwt.verify(keya,'SAmSIM-Sr5slt178');
  if (!decodedToken)  return res.send({ status: false, msg: "token is invalid" });
      console.log(decodedToken)
    
        next()   
}
const middle2= function(req,res,next){
    let a=moment().format('YYYY MM DD, HH:mm:ss ');
    let b=req.ip
    let c=req.path
    
        console.log(a,",",b,",",c)
    next()
    
}



module.exports.middleware=middleware
module.exports.middle2=middle2