// const exp = require('express')
// const app = exp();
const express = require("express");
const router = express.Router();

require("./article")(router);


module.exports = router;

