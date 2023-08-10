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

// CORS
app.use(cors());
app.use(express.json({ limit: "1mb" }));

////////////// TESTING  ////////////////////////////
const http = require("http");

var testIp;
// Set the URL of the request to the ipify API
const options = {
  host: "api.ipify.org",
  port: 80,
  path: "/?format=json",
};

// Create a new http.ClientRequest object
const req = http.request(options, (res) => {
  // Set the response encoding to utf8
  res.setEncoding("utf8");

  // When a chunk of data is received, append it to the body
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });

  // When the response completes, parse the JSON and log the IP address
  res.on("end", () => {
    const data = JSON.parse(body);
    testIp = data.ip;
    // console.log("uuuuu", data.ip);
  });
});

// Send the request
req.end();

app.get("/", async (req, res) => {
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

    var ipInfo;
    await axios
      .get("https://ipinfo.io/json/")
      .then((response) => {
        ipInfo = response.data.ip;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log({ testIp });

    // using  npm ext-ip------------------
    // const ext = extIP.get();
    // const extIp = await ext;

    // using npm public-ip---------------------
    // const userIp = await publicIpv4();

    return res.status(200).json({
      status: true,
      message: "User Ip retrieved successfully",
      ip: { ipInfo, testIp },
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
