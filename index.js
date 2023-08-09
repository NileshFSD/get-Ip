import express from "express";
import cors from "cors";
const app = express();
import { publicIpv4 } from "public-ip";
import os from "os";
import axios from "axios";

// CORS
app.use(cors());
app.use(express.json({ limit: "1mb" }));

////////////// TESTING  ////////////////////////////
app.get("/", async (req, res) => {
  try {
    // const osIp = os.networkInterfaces()
    // const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // const socketIp = req.socket.localAddress

    var ipApi;
    await axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        ipApi = response.data.ip;
      })
      .catch((error) => {
        console.log(error);
      });

    var ipInfo;
    await axios
      .get("https://ipinfo.io/json/")
      .then((response) => {
        ipInfo = response.data.ip;
      })
      .catch((error) => {
        console.log(error);
      });

    const userIp = await publicIpv4();
    return res.status(200).json({
      status: true,
      message: "User Ip retrived successfully",
      ip: { npm: userIp, ipApi, ipInfo },
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

const PORT = 4900;
app.listen(PORT, (res) => {
  console.log(`The app running is in http://localhost:${PORT}`);
});
