const orderModel= require("../models/orderModel")
const productModel= require("../models/productModel")
const userModel= require("../models/userModel")


const createOrder= async function (req, res) {
    let data= req.body
    let UA=data.userId
    let PA=data.productId
    let freeuser=data.isFreeAppUser
let valiedUser= await userModel.findById(UA).select({_id:1})
let valiedProduct= await productModel.findById(PA).select({_id:1})
    if(!UA||!valiedUser){
      let msgUA= !UA?" UserID is Required":"Enter a valied User ID";
      return res.send(msgUA)
    }else if(!PA||!valiedProduct){
      let msgPA= !PA?"Product ID is Required":"Enter a valied Product ID";
      return res.send(msgPA)
    }else if( freeuser!=="true"){
        console.log("this user is not freeAppUser")
        let orderAmount=await productModel.findById(PA).select({price:1,_id:0})
        data.amount=orderAmount.price
        let userBalance=await userModel.findById(UA).select({balance:1,_id:0})
              userBalance=userBalance.balance
              if(userBalance>=data.amount){
                let savedData= await orderModel.create(data)
                let updateUser=await userModel.findByIdAndUpdate({_id:UA},{$inc:{balance:-data.amount}},{new:true}).select({balance:1,_id:0})
                console.log("updated Blalance:",updateUser)
                  return res.send({msg: savedData})
              }
              
        return res.send({msg:"Insufficient balance"})
            }
      data.amount=0
 let savedData= await orderModel.create(data)
  res.send({msg: savedData})
}


module.exports.createOrder= createOrder
