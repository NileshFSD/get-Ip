const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();

// CORS
app.use(cors());
app.use(express.json({ limit: "1mb" }));

////////////// TESTING  ////////////////////////////

// app.set("trust proxy", true);
app.get("/", async (req, res) => {
  try {
    // using  npm ext-ip------------------
    var ipInfo;
    await axios
      .get("https://checkip.amazonaws.com/")
      .then((response) => {
        ipInfo = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return res.status(200).json({
      status: true,
      message: "User Ip retrieved successfully",
      ip: ipInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Server Error. Please try again",
      error: error,
    });
  }
});

const PORT = 4920;
app.listen(PORT, (res) => {
  console.log(`The app running is in http://localhost:${PORT}`);
});
