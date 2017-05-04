var express = require('express');
var db = require('./db');

var createScene = function (idQuiz, name, lat, lon, heading, pitch, zoom, decisionTime, correctDecision, questions, callback) {
  db.beginTransaction(function (err) {
    if (err) {
      throw err;
    }

    let questionParams = [];

    db.query("INSERT INTO Scene SET ?", {
      quiz: idQuiz,
      name: name,
      lat: lat,
      lon: lon,
      heading: heading,
      pitch: pitch,
      zoom: zoom,
      decisionTime: decisionTime,
      correctDecision: correctDecision
    }, function (error, sceneResults, fields) {
      if (error) {
        console.log(error);
        return db.rollback(function () {
          callback(error, null);
        });
      }

      var sceneID = sceneResults.insertId;

      // TODO: Verificar se não há perguntas vazias
      questions.forEach(function (element, index, array) {
        questionParams.push([element, sceneID]);
      });

      db.query('INSERT INTO Question(statement, scene) VALUES ?', [questionParams], function (error, questionResults, fields) {
        if (error) {
          return db.rollback(function () {
            callback(error, null);
          });
        }

        db.commit(function (err) {
          if (err) {
            return db.rollback(function () {
              callback(error, null);
            });
          }
          callback(null, questionResults);
          console.log('success!');
        });
      });
    })
  })
};

module.exports.createScene = createScene;
