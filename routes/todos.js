const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

// Connect To Database

const db = mongojs('mongodb://belchenkov:mongomaster88@ds111622.mlab.com:11622/meantodos', ['todos']);

// Get Todos
router.get('/todos', (req, res, next) => {
    db.todos.find((err, todos) => {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

// Get Single Todo
router.get('/todo/:id', (req, res, next) => {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, (err, todo) => {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

// Save Todo
router.post('/todo', (req, res, next) => {
    let todo = req.body;
    if (!todo.text || !(todo.isComleted + '')) {
        res.status(400);
        res.json({
            "error": "Неверный данные"
        });
    } else {
        db.save(todo, (err, result) => {
            if (err) {
            res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', (req, res, next) => {
    let todo = req.body;
    let upObj = {};

    if (todo.isComleted) {
        upObj.isCompleted = todo.isComleted;
    }

    if (todo.text) {
        upObj.text = todo.text;
    }

    if (!upObj) {
        res.status(400);
        res.json({
            "error": "Неверный данные"
        });
    } else {
        db.todos.update({
           _id: mongojs.ObjectId(req.params.id)
        }, upObj, {}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/todo/:id', (req, res, next) => {

    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;