var express = require('express');
var db = require('./db');

var createScene = function (idQuiz, questionStatement, lat, lon, heading, pitch, zoom, decisionTime, correctDecision, signs, questions, callback) {
  db.getConnection(function(err, connection) {

    connection.beginTransaction(function (err) {
      if (err) {
        throw err;
      }

      let questionParams = [];

      connection.query("INSERT INTO Scene SET ?", {
        quiz: idQuiz,
        questionStatement: questionStatement,
        lat: lat,
        lon: lon,
        heading: heading,
        pitch: pitch,
        zoom: zoom,
        decisionTime: decisionTime,
        correctDecision: correctDecision,
        signs: signs,
      }, function (error, sceneResults, fields) {
        if (error) {
          console.log(error);
          return connection.rollback(function () {
            callback(error, null);
          });
        }

        var sceneID = sceneResults.insertId;

        // TODO: Verificar se não há perguntas vazias
        questions.forEach(function (element, index, array) {
          questionParams.push([element, sceneID]);
        });

        connection.query('INSERT INTO Question(statement, scene) VALUES ?', [questionParams], function (error, questionResults, fields) {
          if (error) {
            return connection.rollback(function () {
              callback(error, null);
            });
          }

          connection.commit(function (err) {
            if (err) {
              return connection.rollback(function () {
                callback(error, null);
              });
            }
            callback(null, questionResults);
            console.log('success!');
          });
        });
      })
    })
  });
};

var getScene = function (idScene, callback) {
  db.query('SELECT * FROM Scene WHERE idScene = ?', [idScene], function (error, results) {
    callback(error, results);
  });
};

var getQuestions = function (idScene, callback) {
  db.query('SELECT * FROM Question WHERE scene = ?', [idScene], function (error, results) {
    callback(error, results);
  });
};

var answer = function (idScene, idUser, decision, decisionTime, questionIDs, answers) {
  console.log(idScene, idUser, decision, decisionTime, questionIDs, answers);
  db.query('INSERT INTO Decision (idUser, idScene, decision, decisionTime) VALUES (?, ?, ?, ?)',
  [idUser, idScene, decision, decisionTime],
  function (error, results) {
  });

  for (var i = 0; i < questionIDs.length; i++) {
    db.query('INSERT INTO Answer (idUser, idQuestion, answer) VALUES (?, ?, ?)',
      [idUser, questionIDs[i], answers[i]],
      function (error, results) {
      });
  }
}

module.exports = {
  createScene: createScene,
  getScene: getScene,
  getQuestions: getQuestions,
  answer: answer,
};
