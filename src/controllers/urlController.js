const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortId = require("shortid");


const baseUrl = "http://localhost:3000"



const shortenUrl = async function (req, res) {

    const data=req.body
    if (Object.keys(data).length > 1) return res.status(400).send({ status: false, message: "Request Body Cant Be Empty" });
    const { longUrl } = data

    if (typeof longUrl !== "string") return res.status(400).send({ status: false, message: "longUrl Should Be A String Only" });
    if (!validUrl.isUri(longUrl)) return res.status(400).send({ status: false, message: "Please Check The longUrl,its A InValid URL" });

    const url = await urlModel.findOne({ longUrl: longUrl }).select({_id:0,urlCode:1,longUrl:1,shortUrl:1});
    if (url) {
        return res.status(201).send({ status: true, data: url });
    } else {

        const code = shortId.generate();
        data.urlCode = code
        const shortenUrl = baseUrl + "/" + code;
        data.shortUrl = shortenUrl;

        const  saveData= await urlModel.create(data);
        const obj = {
            longUrl: saveData.longUrl,
            shortUrl: saveData.shortUrl,
            urlCode: saveData.urlCode
        }
        return res.status(201).send({ status: true, data: obj })

    }
}



const redirect = async function (req, res) {

    const urlcode = req.params.urlCode;
    if (!urlcode) return res.status(400).send({ status: false, message: "Please Enter A UrlCode" });
    if (!shortId.isValid(urlcode)) return res.status(400).send({ status: false, message: "Please Check The UrlCode" });
    let data = await urlModel.findOne({ urlCode: urlcode }).select({ longUrl: 1 });
    if (!data) return res.status(404).send({ status: false, message: "No Url Found" });
    return res.status(308).redirect(data.longUrl);

}





module.exports = { shortenUrl, redirect }