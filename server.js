require("dotenv").config({ path: "./.env" });
const express = require("express");
const MongoDB = new (require("./services/mongoDB"))();
const cors = require("cors");
const geolocationRoutes = require("./routes/geoLocationRoute");

const app = express();

// Middleware
app.use(cors({
    origin:"https://client-geolocator.vercel.app/"
}));
app.use(express.json());

// Routes
app.use("/", geolocationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
