import mongoose from 'mongoose';
import 'dotenv/config';

const TASK_AND_HABIT_USER_DB = 'user_task_and_habits'

let connection = undefined;

// this function connects to the MongoDB server and to the database 'todo-and-habit-database' in that server
async function connect() {
    try {
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING,
            { dbName: TASK_AND_HABIT_USER_DB });
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

// schema
const usersTaskAndHabitSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    priority_choices: [String],
    taskView: {
        priority: {type: Boolean, default: true},
        expectedTodoDate: {type: Boolean, default: true},
        dueDate: {type: Boolean, default: true},
        description: {type: Boolean, default: true}
    },
    tasks: [
        new mongoose.Schema({
            name: { type: String, required: true },
            completed: { type: Boolean, required: false, default: false },
            priority: { type: String, required: false },
            expectedTodoDate: { type: Date, required: false },
            dueDate: { type: Date, required: false },
            description: { type: String, required: false }
        })
    ],
    habits: [
        new mongoose.Schema({
            name: { type: String, required: true },
            recurrance: { type: String, required: true }
        })
    ]
});

// compile model from schema
const UsersTasksAndHabits = mongoose.model(TASK_AND_HABIT_USER_DB, usersTaskAndHabitSchema);

/**
 * Create a User.
 * @param {String} email
 * @param {String} password
 * @returns A promise. Resolves to a JSON object for the document created by calling save
 */

const createUser = async (email, password) => {
    const user = new UsersTasksAndHabits({ email: email, password: password, priority_choices: ['Low', 'Medium', 'High'] });
    return user.save();
}

const getUsers = async (params) => {
    const query = UsersTasksAndHabits.find(params);
    return query.exec();
}

const getUserPriorityList = async (id) => {
    const query = UsersTasksAndHabits.findById(id);
    query.select('priority_choices');
    return query.exec();
}

const getUserTaskView = async(id) => {
    const query = UsersTasksAndHabits.findById(id);
    query.select('taskView');
    return query.exec();
}

const editUserTaskView = async(id, body) => {
    const query = UsersTasksAndHabits.findByIdAndUpdate(
        id,
        {$set: {
            "taskView.$[arr].priority": body.priority,
            "taskView.$[arr].expectedTodoDate": body.expectedTodoDate,
            "taskView.$[arr].dueDate": body.dueDate,
            "taskView.$[arr].description": body.description
        }},
        {new: true}
    )

    return query.exec();
}

const addUserTask = async (id, body) => {
    const query = UsersTasksAndHabits.findOneAndUpdate(
        { _id: id },
        { $push: { "tasks": body } },
        {new: true}
    );

    return query.exec();
}

const getUserTasks = async(id) => {
    const query = UsersTasksAndHabits.findById(id);
    query.select('tasks');
    return query.exec();
}

const getUserTasksById = async ( userId, taskId) => {
    const query = UsersTasksAndHabits.findOne({
        _id: userId,
        'tasks': {$elemMatch: {_id: taskId}}
    },{'tasks.$': 1, email: 1});
    return query.exec();
}

const editUserTaskById = async (userId, taskId, body) => {
    const query = UsersTasksAndHabits.findByIdAndUpdate(
        userId,
        {$set: {
            "tasks.$[arr].name": body.name,
            "tasks.$[arr].completed": body.completed,
            "tasks.$[arr].priority": body.priority,
            "tasks.$[arr].expectedTodoDate": body.expectedTodoDate,
            "tasks.$[arr].dueDate": body.dueDate,
            "tasks.$[arr].description": body.description
        }},
        {
            arrayFilters: [{"arr._id": taskId}],
            new: true
        }
    )

    return query.exec();
}

const editUserTaskCompleted = async(userId, taskId, taskBody) => {
    const query = UsersTasksAndHabits.findByIdAndUpdate(
        userId,
        {$set: {
            "tasks.$[arr].completed": taskBody.completed
        }},
        {
            arrayFilters: [{"arr._id": taskId}],
            new: true
        }
    )

    return query.exec();
}

const deleteUserTaskById = async (userId, taskId) => {
    const query = UsersTasksAndHabits.findByIdAndUpdate(userId, {
        $pull: {tasks: {_id: taskId}}
    });
    return query.exec();
}

export { connect, createUser, getUsers, getUserPriorityList, getUserTaskView, editUserTaskView, addUserTask, getUserTasks, getUserTasksById, editUserTaskById, editUserTaskCompleted, deleteUserTaskById }