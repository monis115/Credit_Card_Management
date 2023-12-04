const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000; // You can change this port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const whitelist = ["http://localhost:3002/"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors());

dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(require("./routes/auth"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
