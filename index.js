require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const http = require("http");
const Twit = require("twit");

const server = http.createServer(app);

const getPrice = async () => {
  const { data } = await axios.get(
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  );

  console.log(data);

  const { symbol, price } = data;

  const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

  const publicPrice = Number(price);

  T.post(
    "statuses/update",
    { status: `#Bitcoin is currently trading at $${publicPrice}` },
    function (err, data, response) {
      // console.log(data);
    }
  );
};

setInterval(getPrice, 3600000);

const PORT = process.env.PORT || "8080";

server.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
