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
var isQuizOwner = function (idQuiz, idUser, callback) {

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

  db.query("SELECT Scene.idScene, Scene.questionStatement FROM Quiz " +
    "INNER JOIN Scene ON quiz = idQuiz " +
    "WHERE idQuiz = ? AND idUser = ? " +
    "ORDER BY idScene ASC", [idQuiz, idUser], function (error, results) {
    if(error)
    {
      callback(error, null);
      return;
    }

    callback(null, results);
  } )
};

var nextScene = function (idScene, callback) {
  db.query('SELECT * FROM Scene WHERE idScene > ? ' +
    'AND quiz = (SELECT quiz FROM Scene WHERE idScene = ?) ' +
    'ORDER BY idScene ASC LIMIT 1', [idScene, idScene], function (error, results) {
    callback(error, results);
  });
}

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
  db.query("SELECT idQuiz, Quiz.name quizName, Decision.idScene, Scene.questionStatement questionStatement," +
    " Decision.idUser, Users.name, Decision.decisionTime, decision " +
    "FROM Decision INNER JOIN Scene ON Decision.idScene = Scene.idScene INNER JOIN Quiz ON idQuiz = quiz " +
    "INNER JOIN Users ON Decision.idUser = Users.idUser " +
    "WHERE State = 1 AND Quiz.idQuiz = ?",
    [quizID], callback);
};

var getQuizAnswers = function (quizID, callback) {
  db.query("SELECT idQuiz, Quiz.name quizName, Scene.idScene, Scene.questionStatement questionStatement,Answer.idUser, Users.name," +
    "Answer.idQuestion, statement, answer " +
    "FROM Question INNER JOIN Scene ON Question.scene = Scene.idScene " +
    "INNER JOIN Quiz ON idQuiz = quiz " +
    "INNER JOIN Answer ON Answer.idQuestion = Question.idQuestion " +
    "INNER JOIN Users ON Answer.idUser = Users.idUser " +
    "WHERE state = 1 and idQuiz = ?",
    [quizID], callback);
}

var getUnansweredQuestion = function(idQuiz, idUser, callback)
{
  db.query("SELECT Scene.idScene FROM Scene "+
  "WHERE quiz = ? AND Scene.idScene NOT IN (SELECT s.idScene FROM Scene s INNER JOIN Decision d " +
  "ON d.idScene = s.idScene " +
  "WHERE idDecision IS NOT NULL AND quiz = ? AND idUSer = ?) " +
  "ORDER BY idScene LIMIT 1", [idQuiz, idQuiz, idUser], callback);
}

var quizExists = function (quizID, callback) {
  db.query("SELECT idQuiz FROM Quiz WHERE idQuiz = ? ", [quizID], function (error, results) {
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
}


module.exports.createQuiz = createQuiz;
module.exports.isQuizOwner = isQuizOwner;
module.exports.getScenesFromQuiz = getScenesFromQuiz;
module.exports.getQuizzesListFromUser = getQuizzesListFromUser;
module.exports.getQuizState = getQuizState;
module.exports.getQuizDecision = getQuizDecision;
module.exports.getQuizAnswers = getQuizAnswers;
module.exports.nextScene = nextScene;
module.exports.getUnansweredQuestion = getUnansweredQuestion;
module.exports.quizExists = quizExists;

