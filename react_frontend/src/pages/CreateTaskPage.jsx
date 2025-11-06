import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CreateTaskPage(){
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState();
    const [expectedTodoDate, setExpectedTodoDate] = useState();
    const [priority, setPriority] = useState('');
    const [completed, setCompleted] = useState(false);
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const createTask = async (e) => {
        e.preventDefault();

        const newTask = {name, dueDate, expectedTodoDate, priority, completed, description};
        console.log(newTask);
        const response = await fetch('/690adf9649e1ef455e6d0110/task', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.status===201) {
            navigate('/');
        } else {
            alert(`Failed to create task, status code = ${response.status}`);
        }
    }

    const cancelAdd = () => {
        navigate('/');
    }

    return (
        <form className='form'>
            <fieldset>
                <legend>Add Task</legend>
                <label className='form-field'><span className='label'>Name:</span>
                    <input type='text' placeholder="Enter name of exercise here" value={name} onChange={e => setName(e.target.value)}/>
                </label>
                <label className='form-field'><span className='label'>Completed</span>
                    <input type='checkbox' checked={completed} onChange={e => setCompleted(e.target.checked)}/>
                </label>
                <br></br>
                <label className='form-field'><span className='label'>Due Date:</span>
                    <input type='date' placeholder="YYYY-MM-DD" value={dueDate} onChange={e => setDueDate(e.target.value)}/>
                </label>
                <br></br>
                <label className='form-field'><span className='label'>Expected To-Do Date:</span>
                    <input type='date' placeholder="YYYY-MM-DD" value={expectedTodoDate} onChange={e => setExpectedTodoDate(e.target.value)}/>
                </label>
                <br></br>
                <label className='form-field'><span className='label'>Priority:</span>
                    <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </label>
                <br></br>
                <label className='form-field'><span className='label'>Description:</span>
                    <input type='text' placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                </label>
            </fieldset>
            <button onClick={createTask}>Create</button>
            <button onClick={cancelAdd}>Cancel</button>
        </form>
    )
}

export default CreateTaskPage;