const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));// It is a inbuilt method in express to recognize the incoming Request Object as strings or arrays



mongoose.connect("mongodb+srv://panigrahisameer_200:iklsSoxrtvpy4JOK@cluster0.kyd9m93.mongodb.net/group-56", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
