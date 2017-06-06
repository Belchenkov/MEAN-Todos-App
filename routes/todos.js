const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

// Connect To Database

const db = mongojs('mongodb://belchenkov:mongomaster88@ds111622.mlab.com:11622/meantodos', ['todos']);


router.get('/todos', (req, res, next) => {
    db.todos.find((err, todos) => {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

module.exports = router;