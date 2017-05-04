var express = require('express');
var db = require('./db');

var createQuiz = function (idUser, name, callback) {

  db.query("INSERT INTO Quiz SET ?", {
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
var getQuizzesListFromUser = function (idUser, callback) {
  db.query("SELECT idQuiz, name FROM Quiz WHERE idUser = ?", [idUser], function (error, results) {
    if(error)
    {
      console.log(error);
      callback(error, null);
      return;
    }
    callback(null, results);

  })

}
var isQuestionOwner = function (idQuiz, idUser, callback) {

  db.query("SELECT idQuiz, name FROM Quiz WHERE idQuiz = ? AND idUser = ?", [idQuiz, idUser], function (error, results) {
    if(error)
    {
      console.log(error);
      callback(error, null);
      return;
    }
    if(results.length > 0)
      callback(null, true);
    else callback(null, false);
  })
};

var getScenesFromQuiz = function (idQuiz, idUser, callback) {

  db.query("SELECT Scene.idScene, Scene.name FROM Quiz " +
    "INNER JOIN Scene ON quiz = idQuiz " +
    "WHERE idQuiz = ? AND idUser = ?", [idQuiz, idUser], function (error, results) {
    if(error)
    {
      callback(error, null);
      return;
    }

    callback(null, results);
  } )
};

var getQuizState = function (idQuiz, callback) {

  db.query("SELECT state FROM Quiz WHERE idQuiz = ?", [idQuiz], function (error, results) {
    if(error)
    {
      callback(error, null);
      return;
    }

    callback(null, results);
  } )
};

var incQuizState = function (idQuiz, callback) {
  getQuizState(idQuiz, function(error, results) {
    db.query("UPDATE Quiz SET state = ? WHERE idQuiz = ?", [results[0].state + 1, idQuiz], function (error, results) {
      if(error) {
        callback(error);
        return;
      }

      callback(null);
    });
  });
};


module.exports.createQuiz = createQuiz;
module.exports.isQuestionOwner = isQuestionOwner;
module.exports.getScenesFromQuiz = getScenesFromQuiz;
module.exports.getQuizzesListFromUser = getQuizzesListFromUser;
module.exports.getQuizState = getQuizState;

