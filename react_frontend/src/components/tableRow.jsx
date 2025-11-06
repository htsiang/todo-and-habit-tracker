import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import UpdateDelete from './UpdateDelete';

function TableRow({ task, onDelete, onEdit }) {
    const [completed, setCompleted] = useState(task.completed);

    const updateCompleteness = async (checked) => {
        const response = await fetch(`/690adf9649e1ef455e6d0110/task/${task._id}/complete`, {
            method: 'PUT',
            body: JSON.stringify({completed: checked}),
            headers: { 'Content-Type': 'application/json' }
        });


        if (response.status=== 201) {
            setCompleted(checked);
        } else {
            alert(`Failed to edit exercise. Status code = ${response.status}`);
        }
    }

    return (
        <tr>
            <td className='columns'>{task.name}</td>
            <td className='columns'><input type='checkbox' checked={completed} onChange={e => { setCompleted(e.target.checked); updateCompleteness(e.target.checked); }} /></td>
            <td className='columns'>{task.dueDate}</td>
            <td className='columns'>{task.expectedTodoDate}</td>
            <td className='columns'>{task.priority}</td>
            <td className='columns'>{task.description}</td>
            <UpdateDelete className='columns' task={task} onDelete={onDelete} onEdit={onEdit} />
        </tr>
    )
}

export default TableRow;