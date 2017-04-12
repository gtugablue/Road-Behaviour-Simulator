const express = require('express');
const connection = require('../database/db');
const router = express.Router();

router.route('/create')
    .post((req, res) => {

        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const questions = Array.from(req.body.questions);
        const decisionTime = parseInt(req.body.decisionTime);
        const decision = (req.body.decision === 'stop');

        let questionParams = [];

        if (latitude == ''
            || longitude == ''
            || questions.length <= 0
            || decision == ''
            || decisionTime < 1
            || decisionTime > 5)
        {
            res.status(400);
            res.redirect('/quiz');
            return;
        }

        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            connection.query('INSERT INTO scene SET ?', {
                quiz: 1,
                lat: latitude,
                lon: longitude,
                decisionTime: decisionTime,
                correctDecision: decision
            }, function (error, sceneResults, fields) {
                if (error) {
                    return connection.rollback(function () {
                        throw error;
                    });
                }
                var sceneID = sceneResults.insertId;

                questions.forEach(function (element, index, array) {
                    questionParams.push([element, sceneID]);
                });

                connection.query('INSERT INTO question(statement, scene) VALUES ?', [questionParams], function (error, questionResults, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }

                    connection.commit(function (err) {
                        if (err) {
                            return connection.rollback(function () {
                                throw err;
                            });
                        }
                        console.log('success!');
                    });
                });
            });
        });

        res.status(200);
        res.send('Success');
    });

module.exports = router;