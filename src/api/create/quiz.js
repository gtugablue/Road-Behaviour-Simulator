const express = require('express');
const connection = require('../../database/db');
const router = express.Router();

router.route('/')
    .post((req, res) => {
        console.log(req.body);
        const name = req.body.name;

        if (name == '') {
            res.status(400);
            res.redirect('/personalPage');
            return;
        }
/*
        //TODO: Acabar o inserir quiz

        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            connection.query('INSERT INTO quiz SET ?', {
                name: name,
                idUser: 1
            }, function (error, sceneResults, fields) {
                if (error) {
                    return connection.rollback(function () {
                        throw error;
                    });
                }
                var sceneID = sceneResults.insertId;

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
*/
        res.status(200);
        res.redirect('/quiz/1');
    });


module.exports = router;