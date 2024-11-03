"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require("express-session");

const appRoutes = require('./src/routes/routes');

const app = express();
const port = 8080;  // Menggunakan port 8080 untuk menghindari konflik dengan port 80

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "src/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(
   session({
      secret: "uts_web_lanjut",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
   })
);

app.use('/', appRoutes);

// Listen on all network interfaces for LAN access
app.listen(port, '0.0.0.0', () => {
   console.log(`Listening at http://0.0.0.0:${port}`);
});
