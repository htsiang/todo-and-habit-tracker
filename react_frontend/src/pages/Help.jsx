import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Help(){
    return (
        <div>
            <h2>Help</h2>
            <ul>
                <li>To create a task, either click "create new task" on the navigation bar at the top of the page, or click the "+" at the top of the task table on the dashboard.</li>
                <li>Once you've added a task, you can edit a task by clicking the pencil symbol in the same row as the task in the task table on the dashboard.
                    You can delete the task by clicking the trash can symbol in the same row as the task in the task table on the dashboard.
                </li>
                <li>To mark a task as completed, you check the checkbox under the "done" column in the dashboard, or check the checkbox labeled 'done' when editing.</li>
            </ul>
        </div>
    )
}

export default Help;