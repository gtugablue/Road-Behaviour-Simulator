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

var getQuizDecision = function (quizID, callback) {
  db.query("SELECT idQuiz, Quiz.name quizName, Decision.idScene, Scene.name sceneName," +
    " Decision.idUser, Users.name, Decision.decisionTime, decision " +
    "FROM Decision INNER JOIN Scene ON Decision.idScene = Scene.idScene INNER JOIN Quiz ON idQuiz = quiz " +
    "INNER JOIN Users ON Decision.idUser = Users.idUser " +
    "WHERE State = 1 AND Quiz.idQuiz = ?",
    [quizID], callback);
};

var getQuizAnswers = function (quizID, callback) {
  db.query("SELECT idQuiz, Quiz.name quizName, Scene.idScene, Scene.name sceneName,Answer.idUser, Users.name," +
    "Answer.idQuestion, statement, answer " +
    "FROM Question INNER JOIN Scene ON Question.scene = Scene.idScene " +
    "INNER JOIN Quiz ON idQuiz = quiz " +
    "INNER JOIN Answer ON Answer.idQuestion = Question.idQuestion " +
    "INNER JOIN Users ON Answer.idUser = Users.idUser " +
    "WHERE state = 1 and idQuiz = ?",
    [quizID], callback);
}


module.exports.createQuiz = createQuiz;
module.exports.isQuestionOwner = isQuestionOwner;
module.exports.getScenesFromQuiz = getScenesFromQuiz;
module.exports.getQuizzesListFromUser = getQuizzesListFromUser;
module.exports.getQuizState = getQuizState;
module.exports.getQuizDecision = getQuizDecision;
module.exports.getQuizAnswers = getQuizAnswers;
