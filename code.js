// import express from "express";
// import cors from "cors";
// const app = express();
// import { publicIpv4 } from "public-ip";
// import os from "os";
// import axios from "axios";
// import  from "ext-ip";

const express = require("express");
const cors = require("cors");
const app = express();
// const publicIpv4 = require("public-ip");
const os = require("os");
const axios = require("axios");
const extIP = require("ext-ip")();
const dns = require("dns");

// CORS
app.use(cors());
app.use(express.json({ limit: "1mb" }));

////////////// TESTING  ////////////////////////////
// app.enable("trust proxy", true);
app.get("/", async (req, res) => {
  var testIP = "dummy";

  try {
    // var ipApi;
    // await axios
    //   .get("https://ipapi.co/json/")
    //   .then((response) => {
    //     ipApi = response.data.ip;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // dns.lookup(
    //   "cooperative-fawn-spacesuit.cyclic.app",
    //   (err, addresses, family) => {
    //     // Print the address found of user
    //     console.log("addresses:", addresses);
    //     testIP = addresses;

    //     // Print the family found of user
    //     console.log("family:", family);
    //   }
    // );

    var ipInfo;
    await axios
      .get("https://ipinfo.io/json/")
      .then((response) => {
        ipInfo = response.data.ip;
      })
      .catch((error) => {
        console.log(error);
      });

    // using  npm ext-ip------------------
    // const ext = extIP.get();
    // const extIp = await ext;

    // using npm public-ip---------------------
    // const userIp = await publicIpv4();

    console.log(req.ips);

    return res.status(200).json({
      status: true,
      message: "User Ip retrieved successfully",
      ip: { ipInfo, testIP },
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
