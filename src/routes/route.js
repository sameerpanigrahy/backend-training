const express = require("express");
const router = express();
const {shortenUrl} = require("../controllers/urlController")
const {fetchLongUrl}=require("../controllers/caching")

router.post("/url/shorten",shortenUrl);
router.get("/:urlCode",fetchLongUrl);


module.exports = router;