const urlModel = require("../models/urlModel");
const shortId = require("shortid");
const redis = require("redis");

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



const fetchLongUrl = async function (req, res) {


  const urlcode = req.params.urlCode;
  if (!urlcode) return res.status(400).send({ status: false, message: "Please Enter A UrlCode" });
  if (!shortId.isValid(urlcode)) return res.status(400).send({ status: false, message: "Please Check The UrlCode" });

  let cachedProfileData = await GET_ASYNC(`${urlcode}`)
 
  if (cachedProfileData) {
    return res.status(308).redirect(cachedProfileData);
  } else {
    let data = await urlModel.findOne({ urlCode: urlcode }).select({ longUrl: 1 });
    if (!data) return res.status(404).send({ status: false, message: "No Url Found" });
    let create = await SET_ASYNC(`${urlcode}`, data.longUrl)
    return res.status(308).redirect(data.longUrl);
  }

};



module.exports = { fetchLongUrl };
