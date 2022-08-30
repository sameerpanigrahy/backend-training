
const { Router } = require("express")
let jwt = require('jsonwebtoken');

const userModel = require("../models/userModel")

const createuser = async function (req, res) {
    try {
        let data = req.body
        let keys = (Object.keys(data).length)
        if (keys != 0) {
            let mailid = await userModel.findOne({ emailId: data.emailId }).select({ _id: 0, emailId: 1 })
            if (mailid) return res.status(400).send({ status: false, msg: "User is alrady exist" })
            let savedData = await userModel.create(data)
            return res.status(201).send({ msg: savedData })
        }
        return res.status(400).send({ msg: "empty request body" })

    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

}
const logginuser = async function (req, res) {
    try {
        let data = req.body
        let keys = (Object.keys(data).length)
        if (keys == 0) return res.status(400).send({ msg: "empty request body" })
        let savedData = await userModel.findOne(data)
        if (!savedData) return res.status(404).send({ status: false, msg: "User Not register" })
        let token = jwt.sign(
            {
                userId: savedData._id.toString(),
                batch: "plutonium",
                organisation: "Function-up"

            },
            'SAmSIM-Sr5slt178');
        console.log(token)
        res.setHeader("X-authentic", token)
        res.status(201).send({ status: true })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}
const getuser = async function (req, res) {
try{
    let userid = req.params.userId
    let savedData = await userModel.findOne({ _id: userid, isDeleted: false })
    if (!savedData) return res.status(404).send({ status: false, msg: "Invalied user" })
    res.status(200).send({ status: true, msg: savedData })
}
catch(err){
    res.status(500).send({msg:err})
}
}
const updateuser = async function (req, res) {
try{
    let userid = req.params.userId
    let data = req.body
    let keys = (Object.keys(data).length)
    if (keys == 0) return res.status(400).send({ msg: "empty request body" })
    let savedData = await userModel.findByIdAndUpdate({ _id: userid }, data, { new: true })
    if (!savedData) return res.status(404).send({ status: false, msg: "Invalied user Id" })
    res.status(200).send({ status: true, msg: savedData })
}
catch(err){
    res.status(500).send({msg:err})
}
}
const deleteuser = async function (req, res) {
try{
    let userid = req.params.userId
    let savedData = await userModel.findByIdAndUpdate({ _id: userid }, { isDeleted: true }, { new: true })
    if (!savedData) return res.status(404).send({ status: false, msg: "Invalied user Id" })
    res.status(200).send({ status: true, msg: savedData })
}
catch(err){
    
    res.status(500).send({msg:err})
}
}



module.exports.createuser = createuser
module.exports.logginuser = logginuser
module.exports.getuser = getuser
module.exports.updateuser = updateuser
module.exports.deleteuser = deleteuser  