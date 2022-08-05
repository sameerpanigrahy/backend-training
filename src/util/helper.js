const char=new Date()
 let newdate=char.getDay() +"/"+char.getMonth()+"/"+char.getFullYear()
 let newmonth=char.getMonth()
function Printdate(){
        console.log("Current Date===>"+char)
      }
    
function Printmonth(){
        console.log("Current Month===>"+newmonth)
      }
function getBatchInfo(){
    console.log("BatchInfo===>Plutonium, W3D5, the topic for today is Nodejs module system.")
}

module.exports.Printdate= Printdate
module.exports.Printmonth=Printmonth
module.exports.getBatchInfo=getBatchInfo