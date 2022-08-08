const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

router.get('/movies',function(req,res){
    const movies=['‘Rang de basanti’' , '‘The shining’', '‘Lord of the rings’', '‘Batman begins’']
    console.log(movies)
    res.send(movies)

})
router.get('/movies/:indexNumber',function(req,res){
    const movies=['‘Rang de basanti’' , '‘The shining’', '‘Lord of the rings’', '‘Batman begins’']
  let request=req.params.indexNumber
  console.log(movies[request])
  res.send(movies[request])        
})
router.get('/movies/:indexNumber',function(req,res){
    const movies=['‘Rang de basanti’' , '‘The shining’', '‘Lord of the rings’', '‘Batman begins’']
    let request=req.params.indexNumber
    if(request>movies.length){
        res.send("Use a valied IndexNumber")
    }else{
        console.log(movies[request])
        res.send(movies[request])  
    }
});
router.get('/films',function(req,res){
    const films=[ {'id': 1,'name': 'The Shining'},
                  {'id': 2,'name': 'Incendies'},
                  {'id': 3,'name': 'Rang de Basanti'},
                  {'id': 4,'name': 'Finding Nemo'}]
    
                  console.log(films)
        res.send(films)
         });
         router.get('/films/:filmId',function(req,res){
            const films=[ {'id': 1,'name': 'The Shining'},
                          {'id': 2,'name': 'Incendies'},
                          {'id': 3,'name': 'Rang de Basanti'},
                          {'id': 4,'name': 'Finding Nemo'}]
        let request=req.params.filmId
        let sam=JSON.stringify(request)
           // console.log(sam)
           if(request>films.length||request<1){
            res.send("Invalied FilmId")
           }else{
        console.log(films[request-1])
        res.send(films[request-1])}
                 });

module.exports = router;