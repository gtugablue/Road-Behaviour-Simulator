var express = require('express');
var db = require('./db');

var createQuestion = function (idQuiz, name, lat, lon, heading, pitch, zoom, decisionTime, correctDecision, questions, callback) {
  db.beginTransaction(function (err) {
    if (err) {
      throw err;
    }

    let questionParams = [];

    db.query("INSERT INTO Scene SET ?", {
      name: name,
      quiz: idQuiz,
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

var answerQuestion = function (userID, questionID, answer, callback) {
  db.query('INSERT INTO Answer (idUser, idQuestion, answer) VALUES (?, ?, ?)',
      [userID, questionID, answer],
    function (error, results) {
      callback(error, results);
    });
};

module.exports.createQuestion = createQuestion;
module.exports.answerQuestion = answerQuestion;
