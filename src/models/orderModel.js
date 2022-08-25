const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

const authorSchema = new mongoose.Schema( {
    
    userId:{
      type:ObjectId,
      ref:'User'
    },
    productId:{
      type:ObjectId,
      ref:"Product"
          },
    amount:Number,
    isFreeAppUser:Boolean, 
    date:String
  

}, { timestamps: true });


module.exports = mongoose.model('order', authorSchema)
