const urlModel = require("../models/urlModel");
//const validUrl = require("valid-url");
const shortId = require("shortid");
const axios=require('axios')


const baseUrl = "http://localhost:3000"



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
        const url = await urlModel.findOne({ longUrl: longUrl }).select({ _id: 0, urlCode: 1, longUrl: 1, shortUrl: 1 });
        if (url) {
            return res.status(201).send({ status: true, data: url });
        } else {

            const code = shortId.generate();
            data.urlCode = code
            const shortenUrl = baseUrl + "/" + code;
            data.shortUrl = shortenUrl;

            const savedData = await urlModel.create(data);
            const obj = {
                longUrl: savedData.longUrl,
                shortUrl: savedData.shortUrl,
                urlCode: savedData.urlCode
            }
            return res.status(201).send({ status: true, data: obj })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}








module.exports = { shortenUrl}