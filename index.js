const express = require("express");
const cors = require("cors");
const app = express();
let extIP = require("ext-ip")({
  mode: "parallel",
  replace: true,
  timeout: 500,
  agent: http.Agent,
  userAgent: "curl/ext-ip-getter",
  followRedirect: true,
  maxRedirects: 10,
  services: ["http://ifconfig.io/ip"],
});
const dotenv = require("dotenv").config();

// CORS
app.use(cors());
app.use(express.json({ limit: "1mb" }));

////////////// TESTING  ////////////////////////////

// app.set("trust proxy", true);
app.get("/", async (req, res) => {
  try {
    // using  npm ext-ip------------------
    const ext = extIP.get();
    const extIp = await ext;

    return res.status(200).json({
      status: true,
      message: "User Ip retrieved successfully",
      ip: { extIp },
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
