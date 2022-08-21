const { count } = require("console")
const authorModel = require("../models/authorModel")
const publisherModel=require("../models/publisherModel")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let AI=data.author
    let PI=data.publisher
let valiAuthor= await authorModel.findById(AI).select({_id:1})
let valiPublisher= await publisherModel.findById(PI).select({_id:1})
    if(!AI||!valiAuthor){
      let msgAI= !AI?"Auther ID is Required":"Enter a valied Auther ID";
      return res.send(msgAI)
    }else if(!PI||!valiPublisher){
      let msgPI= !PI?"Publisher ID is Required":"Enter a valied Publisher ID";
      return res.send(msgPI)
    }
      let savedData= await BookModel.create(data)
    
      res.send({msg:savedData})
    
}
    
const getbook=async function(req,res){

        let saveData= await BookModel.find().populate(["author","publisher"])

     res.send({msg:saveData})
}

const updateBook=async function(req,res){
  let [data1,data2]=await publisherModel.find({name:["HarperCollins","Penguin"]}).select({_id:1})
  //console.log(data1,data2)
  let saveData= await BookModel.updateMany(
    {publisher:[data1,data2]},
    {$set:{isHardCover:true}},
    {new:true})

res.send({msg:saveData})
}

const updateBookA=async function(req,res){
  let [data1,data2,data3]=await authorModel.find({rating:{$gt:3.5}}).select({_id:1})
  
  let saveData= await BookModel.updateMany(
     {author:[data1,data2,data3]},
    {$inc:{price:+10}},
     {new:true})

res.send({msg:saveData})
}



module.exports.createBook= createBook
module.exports.getbook=getbook
module.exports.updateBook=updateBook
module.exports.updateBookA=updateBookA