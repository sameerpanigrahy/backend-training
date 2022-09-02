const axois = require('axios')


const getmemes = async function (req, res) {
    try {
        let option = {
            method: "get",
            url: "https://api.imgflip.com/get_memes"
        }
        let result = await axois(option)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}

const creatMemes = async function (req, res) {
    try {
        let template_id = req.query.template_id
        let text1 = req.query.text0
        let text2 = req.query.text1
        let user = req.query.username
        let password = req.query.password
        let option = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text1}&text1=${text2}&username=${user}&password=${password}`
        }

        let result = await axois(option)

        res.status(201).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}


module.exports.getmemes = getmemes
module.exports.creatMemes = creatMemes