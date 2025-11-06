import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as usersTasksAndHabits from './model.mjs';

const PORT = process.env.PORT;
const app = express();
const ERROR_INVALID_REQ = { Error: "Invalid request" }

app.use(express.json());

app.listen(PORT, async () => {
    await usersTasksAndHabits.connect();
    console.log(`Server listening on port ${PORT}...`);
});




app.post('/users', asyncHandler(async (req, res) => {
    try {
        const user = await usersTasksAndHabits.createUser(req.body.email, req.body.password);
        res.type('application/json').status(201).json(usersTasksAndHabits);
    } catch (err) {
        res.type('application/json').status(400).json(err.message);
    }
}));

app.get('/users/all', asyncHandler(async (req, res) => {
    const result = await usersTasksAndHabits.getUsers();
    res.type('application/json').status(200).json(result);
}));

app.get('/user', asyncHandler(async (req, res) => {
    const result = await usersTasksAndHabits.getUsers({email: req.query.email});
    res.type('application/json').status(200).json(result);
}));

app.get('/:id', asyncHandler(async(req, res) => {
    const result = await usersTasksAndHabits.getUsers({_id: req.params.id});
    res.type('application/json').status(200).json(result);
}))

app.get('/:userId/taskView', asyncHandler(async(req,res) => {
    const result = await usersTasksAndHabits.getUserTaskView(req.params.userId);
    res.type('application/json').status(200).json(result);
}));

app.put('/:userId/taskView/edit', asyncHandler(async (req, res) => {
    try {
        const result = await usersTasksAndHabits.editUserTaskView(req.params.userId, req.body);
        res.type('application/json').status(201).json(result);
    } catch(err) {
        res.type('application/json').status(400).json(err.message);
    }
}));

app.post('/:id/task', asyncHandler(async (req, res) => {
    try {
        const task = await usersTasksAndHabits.addUserTask(req.params.id, req.body);
        res.type('application/json').status(201).json(task);
    } catch (err) {
        res.type('application/json').status(400).json(err.message);
    }
}));

app.get('/:id/tasks', asyncHandler(async (req, res) => {
    const result = await usersTasksAndHabits.getUserTasks(req.params.id);
    res.type('application/json').status(200).json(result);
}));

app.get('/:userId/tasks/:taskId', asyncHandler(async (req, res) => {
    const result = await usersTasksAndHabits.getUserTasksById(req.params.userId, req.params.taskId);
    res.type('application/json').status(200).json(result);
}));

app.put('/:userId/task/:taskId', asyncHandler(async (req, res) => {
    try {
        const result = await usersTasksAndHabits.editUserTaskById(req.params.userId, req.params.taskId, req.body);
        res.type('application/json').status(201).json(result);
    } catch (err) {
        res.type('application/json').status(400).json(err.message);
    }
}));

app.put('/:userId/task/:taskId/complete', asyncHandler(async (req, res) => {
    try {
        const result = await usersTasksAndHabits.editUserTaskCompleted(req.params.userId, req.params.taskId, req.body);
        res.type('application/json').status(201).json(result);
    } catch (err) {
        res.type('application/json').status(400).json(err.message);
    }
}))

app.delete('/:userId/tasks/:taskId', asyncHandler(async (req, res) => {
    try {
        const result = await usersTasksAndHabits.deleteUserTaskById(req.params.userId, req.params.taskId);
        res.status(204).json(result);
    } catch (err) {
        res.type('application/json').status(404).json(err.message);
    }
}));