const express = require("express");

const {generateShortUrl, redirectToUrl, getAnaytics} = require("../controllers/url");

const router = express.Router();

router.post("/", generateShortUrl);

router.get("/:urlId", redirectToUrl)

router.get("/analytics/:urlId", getAnaytics)

module.exports = router;