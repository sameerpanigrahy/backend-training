const urlModel = require("../models/urlModel");
const shortId = require("shortid");
const axios=require('axios')
const redis = require("redis");

const baseUrl = "http://localhost:3000"


const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  13190,
  "redis-13190.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("gkiOIPkytPI3ADi14jHMSWkZEo2J5TDG", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const shortenUrl = async function (req, res) {


    try {
        const data = req.body
        if (Object.keys(data).length > 1) return res.status(400).send({ status: false, message: "Request Body Cant Be Empty" });
        const { longUrl } = data

        if (typeof longUrl !== "string") return res.status(400).send({ status: false, message: "longUrl Should Be A String Only" });
        let option ={
            method:'get',
           url:longUrl
          }
          const valiedUrl= await axios(option)
          .then(()=>longUrl) //*panding & fulfiled promise handling....//
          .catch(()=>null) // reject promise handling"
          if(!valiedUrl) return res.status(400).send({ status: false, message:" url is not valied" })
          
          let cachedProfileData = await GET_ASYNC(`${longUrl}`)
   
          if (cachedProfileData) {
           
            return res.status(200).send({ status: true,message:"This Url is alrady exist", data: {shortUrl:cachedProfileData }});
        } else {

            const code = shortId.generate().toLowerCase();
            data.urlCode = code
            const shortenUrl = baseUrl + "/" + code;
            data.shortUrl = shortenUrl;

            const savedData = await urlModel.create(data);
            const obj = {
                longUrl: savedData.longUrl,
                shortUrl: savedData.shortUrl,
                urlCode: savedData.urlCode
            }
            
             await SET_ASYNC(`${longUrl}`,savedData.shortUrl)
            return res.status(201).send({ status: true, data: obj })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const fetchLongUrl = async function (req, res) {


    const urlcode = req.params.urlCode;
    if (!urlcode) return res.status(400).send({ status: false, message: "Please Enter A UrlCode" });
    if (!shortId.isValid(urlcode)) return res.status(400).send({ status: false, message: "Please Check The UrlCode" });
  
    let cachedProfileData = await GET_ASYNC(`${urlcode}`)
   
    if (cachedProfileData) {
      return res.status(302).redirect(cachedProfileData);
    } else {
      let data = await urlModel.findOne({ urlCode: urlcode }).select({ longUrl: 1 });
      if (!data) return res.status(404).send({ status: false, message: "No Url Found" });
      let create = await SET_ASYNC(`${urlcode}`, data.longUrl)
      return res.status(302).redirect(data.longUrl);
    }
  
  };
  



module.exports = { shortenUrl,fetchLongUrl}