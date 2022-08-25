
const { Router } = require("express")
const BookModel= require("../models/publisherModel")

const createPubli= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

module.exports.createPubli=createPubli