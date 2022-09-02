const axois = require('axios')


const getWeather = async function (req, res) {
    try {
        let location = req.query.location
        let appId = req.query.id
        let option = {
            method: "get",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appId}`
        }
        let result = await axois(option)
        res.status(200).send({ msg: { city: result.data.name, temp: result.data.main.temp } })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}
const getAllTemp = async function (req, res) {
    try {
        let tempOfAllCitys = []
        const cityName = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]

        for (let i = 0; i < cityName.length; i++) {
            let option = {
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName[i]}&appid=45d3f5c9c719d061e2964570744bc8de`
            }
            let result = await axois(option)
            tempOfAllCitys.push({ city: result.data.name, temp: result.data.main.temp })
        }
        let sortedTemp = tempOfAllCitys.sort(
            function (a, b) {
                return a.temp - b.temp
            }
        )
        res.status(200).send({ msg: sortedTemp })
    }

    catch (err) {
        res.status(500).send({ msg: err })
    }
}

module.exports.getWeather = getWeather
module.exports.getAllTemp = getAllTemp