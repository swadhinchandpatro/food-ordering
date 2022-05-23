const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express(); // create express app
import { populateImage } from './controllers/populate-images'

// add middleware
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.get("/restaurants", (req, res) => {
  axios.get('http://cdn.adpushup.com/reactTask.json').then(result => {
    if(!result || /[4-5][0-9]{2}/.test(result.status) || !result.data) {
      res.status(500).json({});
    } else {
      populateImage(result.data);
      res.json(result.data);
    }
  }).catch(err => {
    res.status(500).json({});
  })
})

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
