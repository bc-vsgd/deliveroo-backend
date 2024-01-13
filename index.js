const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/deliveroo/menu/paris/3eme-temple/sub-arc-subway-rambuteau?day=today&geohash=u09wj8rk5bqr&time=ASAP",
      {
        headers: {
          Authorization: `Bearer ${process.env.DELIVEROO_API_KEY}`,
        },
      }
    );
    const data = response.data;
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json({ message: "Server not found" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
