const express = require("express");
const router = express();
const {shortenUrl,fetchLongUrl} = require("../controllers/urlController")


router.post("/url/shorten",shortenUrl);
router.get("/:urlCode",fetchLongUrl);


module.exports = router;