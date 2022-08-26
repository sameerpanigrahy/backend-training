const moment=require('moment');


const middleware= function(req,res,next){
   const  user=req.headers.isfreeappuser
    
    
    if(!user){
      return  res.send({msg:"The request is missing a mandatory header"})
    }
    const isFreeAppUser=Boolean(user)
        req.body["isFreeAppUser"]=isFreeAppUser
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