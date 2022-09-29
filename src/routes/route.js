const express = require("express");
const router = express();
const {shortenUrl,redirect} = require("../controllers/urlController")


router.post("/url/shorten",shortenUrl);
router.get("/:urlCode",redirect);


module.exports = router;