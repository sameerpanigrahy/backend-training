

const UserModel = require("../models/usermodel");

const newBook=( async function(req, res) {
    let data =req.body
    let savedata = await UserModel.create(data)
      res.send({msg:savedata})
    })
const getBooks=(async function(req,res){
    let fetchdata=await UserModel.find({authorName:"SP"})
    res.send({msg:fetchdata})
})
    module.exports.saveData= newBook
    module.exports.fetchData= getBooks