const moment=require('moment');


const middleware= function(req,res,next){
    console.log("This is my first Middle ware")
    let personLogedIn=true
    if(personLogedIn==true){
        next()
    }else{
        res.send({msg:"person is not authenticate"})
    }
    //res.send({msg:"This my Middle-ware"})
    
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