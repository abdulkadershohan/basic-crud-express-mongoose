const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schema/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.json({ message: error });
    }
});

// get a specific todo
router.get('/:todoId', async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo.findById(todoId);
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
})

// create a todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    });
    try {
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// create multiple todos
router.post('/all', async (req, res) => {
    try {
        const todos = await Todo.insertMany(req.body);
        res.status(201).json(todos);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// update a todo
router.patch('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const updatedTodo = await Todo.updateOne(
            { _id: todoId },
            { $set: req.body }
        );
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// delete a todo
router.delete('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const deleteTodo = await Todo.deleteOne({ _id: todoId });
        res.status(200).json(deleteTodo);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

module.exports = router;