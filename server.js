"use strict";

const exp = require("constants");
const express = require("express");
const path = require("path");
const port = 1777;

const app = express();

app.use("", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
   console.log("Press Ctrl + C to stop the server");
});

