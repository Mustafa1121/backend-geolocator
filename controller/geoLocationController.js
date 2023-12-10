const Geolocation = require("../models/geoLocationModel");
const axios = require("axios");
const Email = require("../services/email");

const findGeoLocation = async (req, res) => {
  const { address, email } = req.body;

  try {
    let geolocationData = await Geolocation.findOne({ address });

    if (!geolocationData) {
      const apiKey = process.env.API_KEY // Replace with your OpenCage API key
      const apiResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const { lat, lng } = apiResponse.data.results[0].geometry;

      geolocationData = await Geolocation.create({
        address,
        latitude: lat,
        longitude: lng,
      });
    }

    res.status(200).json(geolocationData);

    const emailInstance = new Email(email);
    emailInstance.sendGeoLocationResult(geolocationData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  findGeoLocation,
};
