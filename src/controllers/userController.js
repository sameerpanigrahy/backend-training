
const { Router } = require("express")
const userModel= require("../models/userModel")

const createuser= async function (req, res) {
    let data= req.body

    let savedData= await userModel.create(data)
    res.send({msg: savedData})
}

module.exports.createuser=createuser