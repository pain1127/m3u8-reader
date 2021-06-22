'use strict';

const dotenv = require('dotenv');
dotenv.config();

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    destination: process.env.DESTINATION,
};
module.exports = config;
