var express = require('express');
var config = require('../configuration/config');

var mysql      = require('mysql');
var connection  = mysql.createPool({
  connectionLimit : 10,
  host     : config.host,
  port     : config.port,
  user     : config.username,
  password : config.password,
  database : config.database
});

module.exports = connection;