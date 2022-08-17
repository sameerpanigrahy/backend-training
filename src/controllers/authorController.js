const AuthorModel= require("../models/authorModel")
const BookModel= require("../models/bookModel")



const createAuthor= async function (req, res) {
    let data= req.body

    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}

const findAuthorId= async function (req, res) {

    let savedData= await AuthorModel.findOne({author_name:"Chetan Bhagat"}).select({author_id:1,_id: 0})
    
    let booklist= await BookModel.find(savedData)
   
        
    res.send({msg: booklist})
}

const upDate= async function (req, res) {

    let savedData= await BookModel.findOneAndUpdate(
        {name:"Two states"},
        {$set:{price:100}},
        {new:true}).select({author_id:1,price:1,_id: 0})
    console.log(savedData.author_id)
    let booklist= await AuthorModel.findOne({author_id:{$eq:savedData.author_id}}).select({author_name:1,_id: 0})
    console.log(booklist)
   
        
    res.send({msg: booklist,Newprice:savedData.price})
}
const findAuthor= async function (req, res) {
    let savedData= await BookModel.find({ price : { $gte: 50, $lte: 100}}).select({ author_id :1,_id: 0})
    let findAuthor= await AuthorModel.find()
//console.log(findAuthor)
let ram=[]

   for (let i=0;i<savedData.length;i++){
         let sum=savedData[i].author_id
        // console.log(sum)
         for(let j=0;j<findAuthor.length;j++){
         let sam=findAuthor[j].author_id
         //console.log(sam)
             if(sum==sam){
                ram += findAuthor[j].author_name + ","
             }}
   }
   console.log([ram])


    res.send({msg:"this is"})
}






module.exports.createAuthor=createAuthor
module.exports.findAuthorId=findAuthorId
module.exports.upDate=upDate
module.exports.findAuthor=findAuthor