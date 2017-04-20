var express = require('express');
var db = require('./db');

var createQuestion = function (idQuiz, lat, lon, name, callback) {

  db.query("INSERT INTO Scene SET ?", {
    idUser: idUser,
    name: name
  }, function (error, results, fields) {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    callback(null, results);
  })
};

module.exports.createQuestion = createQuestion;
