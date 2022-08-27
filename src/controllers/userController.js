
const { Router } = require("express")
let jwt = require('jsonwebtoken');

const userModel= require("../models/userModel")

const createuser= async function (req, res) {
    let data= req.body
    let mailid=await userModel.find({emailId:data.emailId}).select({_id:0,emailId:1})
    if(mailid) return res.send({status:false,msg:"User is alrady exist"})
    let savedData= await userModel.create(data)
    res.send({msg: savedData})
}
const logginuser=async function(req,res){
    let data=req.body
    let savedData=await userModel.findOne(data)
    if(!savedData) return res.send({status:false,msg:"User Not register"})
    let token = jwt.sign(
        { 
          userId:savedData._id.toString(),
          batch:"plutonium",
          organisation:"Function-up"

         },
        'SAmSIM-Sr5slt178');
        console.log(token)
    res.setHeader("X-authentic",token)
    res.send({status:true,msg:token})
}
const getuser=async function(req,res){
    
    let userid=req.params.userId
    let savedData=await userModel.findById(userid)
    if(!savedData) return res.send({status:false,msg:"Invalied user Id"})
    res.send({status:true,msg:savedData})
}
const updateuser=async function(req,res){
    
    let userid=req.params.userId
    let data=req.body
    let savedData=await userModel.findByIdAndUpdate({_id:userid},data,{new:true})
    if(!savedData) return res.send({status:false,msg:"Invalied user Id"})
    res.send({status:true,msg:savedData})
}
const deleteuser=async function(req,res){
    
    let userid=req.params.userId
    let savedData=await userModel.findByIdAndUpdate({_id:userid},{isDeleted:true},{new:true})
    if(!savedData) return res.send({status:false,msg:"Invalied user Id"})
    res.send({status:true,msg:savedData})
}



module.exports.createuser=createuser
module.exports.logginuser=logginuser
module.exports.getuser=getuser
module.exports.updateuser=updateuser
module.exports.deleteuser=deleteuser