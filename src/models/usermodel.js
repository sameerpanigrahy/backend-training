const mongoose=require('mongoose');

const bookSchema= new mongoose.Schema({
bookName:String,
authorName:String,
edition:String,
tag:['java',"js","nodejs"],
date:{type:Date,default:Date.new},
isSale:{type:Boolean,default:false},
price:{type:Number,Ind:"Rs",Usa:"dolar"}
},{timestamps:true});
module.exports = mongoose.model('booklist', bookSchema)