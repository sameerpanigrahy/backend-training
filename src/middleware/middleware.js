const moment=require('moment');
let jwt = require('jsonwebtoken');



  const authenticate = async function (req, res, next) {
      let token = req.headers["x-auth-token"] || req.headers["x-Auth-Token"]
      if (!token) return res.status(400).send({ status: false, msg: "token must be present in the request header" })
      let decodedToken = jwt.verify(token, 'SAmSIM-Sr5slt178', function (err, decodedToken) {
        if (err) {
          res.status(401).send({ status: false, msg: "invalid token" })
        } else {
          return decodedToken
        }  
      })
      req.decodedToken = decodedToken
      next()
    }
  const authorization= async function(req,res,next){
      userid=req.params.userId
      authorized_id=req.decodedToken["userId"]
      if(userid==authorized_id){
        next()
      }else{
        return res.status(200).send({status:false,msg:"Un-authorized_id"})
      }
  }
  
const middle2= function(req,res,next){
    let a=moment().format('YYYY MM DD, HH:mm:ss ');
    let b=req.ip
    let c=req.path
    
        console.log(a,",",b,",",c)
    next()
    
}



//module.exports.middleware=middleware
module.exports.middle2=middle2
module.exports.authenticate=authenticate
module.exports.authorization=authorization