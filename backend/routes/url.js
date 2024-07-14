const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirect,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleRedirect);

module.exports = router;
