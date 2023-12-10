const express = require("express");
const router = express.Router();
const { findGeoLocation } = require("../controller/geoLocationController");

router.post("/geolocation", findGeoLocation);

module.exports = router;
