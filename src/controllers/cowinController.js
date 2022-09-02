const axois = require('axios')


const getState = async function (req, res) {
    try {
        let option = {
            method: "get",
            url: "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        }
        let result = await axois(option)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}

const getDistricts = async function (req, res) {
    try {
        let stateId = req.params.stateId
        let option = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
        }
        let result = await axois(option)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}

const appointmentBydstrict = async function (req, res) {
    try {
        let id = req.query.district_id
        let date = req.query.date
        let option = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let result = await axois.get(option)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}
const appointmentBypin = async function (req, res) {
    try {
        let pin = req.query.pin
        let date = req.query.date
        let option = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axois(option)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}



module.exports.getState = getState
module.exports.getDistricts = getDistricts
module.exports.appointmentBydstrict = appointmentBydstrict
module.exports.appointmentBypin = appointmentBypin