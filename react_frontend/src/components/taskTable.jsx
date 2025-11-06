import React from 'react';
import '../App.css';
import TableRow from './TableRow';

function TaskTable({ tasks, onDelete, onEdit }){
    return (
        <table className='table'>
            <caption></caption>
            <thead>
                <tr>
                    <th className='columns'>Name</th>
                    <th className='columns'>Done</th>
                    <th className='columns'>Due Date</th>
                    <th className='columns'>Expected To-Do Date</th>
                    <th className='columns'>Priority</th>
                    <th className='columns'>Description</th>
                    <th className='columns'>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, i) => <TableRow task={task} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    )
}

export default TaskTable;