const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
const listMessages = require("./getLabels.js");

app.post("/list", async (req, res) => {
  const data = await listMessages(req.body.query);
  res.send(data);
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.listen(PORT, (req, res) => {
  console.log(`App is Listening on PORT: ${PORT}`);
});
