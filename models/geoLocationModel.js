const mongoose = require('mongoose');

const geolocationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
});

module.exports = mongoose.model('Geolocation', geolocationSchema);;
