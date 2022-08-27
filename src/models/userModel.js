const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile : String,
    emailId : {type:String,unique:true},
    password : String,
    gender: {type:String,enum:["male","female","LGBT"]},
	isDeleted: {type:Boolean,default:false}, //default value is false 
    age :Number,

}, { timestamps: true} );


module.exports = mongoose.model('Usercollection', userSchema) 
