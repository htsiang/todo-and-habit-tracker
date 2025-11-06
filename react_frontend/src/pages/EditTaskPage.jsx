import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function EditTaskPage({ taskToEdit }) {
    const [name, setName] = useState(taskToEdit.name);
    const [dueDate, setDueDate] = useState(getDateFormat(taskToEdit.dueDate));
    const [expectedTodoDate, setExpectedTodoDate] = useState(getDateFormat(taskToEdit.expectedTodoDate));
    const [priority, setPriority] = useState(taskToEdit.priority);
    const [completed, setCompleted] = useState(taskToEdit.completed);
    const [description, setDescription] = useState(taskToEdit.description);

    const navigate = useNavigate();

    const editTask = async () => {
        const updatedTask = {name, dueDate, expectedTodoDate, priority, completed, description};
        const response = await fetch(`/690adf9649e1ef455e6d0110/task/${taskToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
            headers: {'Content-Type': 'application/json'}
        });


        if(response.status===201){
            navigate("/");
        } else{
            alert(`Failed to edit exercise. Status code = ${response.status}`);
        }
    }

    const cancelEdit = () => {
        navigate('/');
    }

    return (
        <form className='form'>
            <fieldset>
                <legend>Edit Task</legend>
                <label className='form-field'><span className='label'>Name:</span>
                    <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                </label>
                <label className='form-field'><span className='label'>Completed</span>
                    <input type='checkbox' checked={completed} onChange={e => setCompleted(e.target.checked)}/>
                </label>
                <br></br>
                <label className='form-field'><span className='label'>Due Date:</span>
                    <input type='date' value={dueDate} onChange={e => setDueDate(e.target.value)}/>
                </label>
                <br></br>
                <label className='form-field'><span className='label'>Expected To-Do Date:</span>
                    <input type='date' value={expectedTodoDate} onChange={e => setExpectedTodoDate(e.target.value)}/>
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
                    <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
                </label>
            </fieldset>
            <button onClick={e => {e.preventDefault(); editTask()}}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
        </form>
    )
}

function getDateFormat(d1){
    const date = new Date(d1);
    return date.getFullYear() +'-'+ ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) +'-'+ ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
}

export default EditTaskPage;