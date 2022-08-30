const moment = require('moment');
let jwt = require('jsonwebtoken');



const authenticate = async function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"] || req.headers["x-Auth-Token"]
    if (!token) return res.status(400).send({ status: false, msg: "token must be present in the request header" })
    let decodedToken = jwt.verify(token, 'SAmSIM-Sr5slt178')
    req.decodedToken = decodedToken
    next()
  }
  catch (err) {
    res.status(500).send({ msg: err })
  }
}
const authorization = async function (req, res, next) {
 try { 
  userid = req.params.userId
  if(!userid) return res.status(400).send({msg:"user iD is reuired"})
  authorized_id = req.decodedToken["userId"]
  if (userid == authorized_id) {
    next()
  } else {
    return res.status(403).send({ status: false, msg: "Un-authorized_User" })
  }}
  catch(err){
    res.status(500).send({msg:err})
  }
}

const middle2 = function (req, res, next) {
  let a = moment().format('YYYY MM DD, HH:mm:ss ');
  let b = req.ip
  let c = req.path

  console.log(a, ",", b, ",", c)
  next()

}



//module.exports.middleware=middleware
module.exports.middle2 = middle2
module.exports.authenticate = authenticate
module.exports.authorization = authorization