import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import TaskTable from '../components/taskTable';

function Dashboard({ setTaskToEdit }) {
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    const loadTasks = async () => {
        const response = await fetch('/690adf9649e1ef455e6d0110/tasks');
        const data = await response.json();
        setTasks(data.tasks);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    const navToAdd = () => {
        navigate('/addTask')
    }

    const onDelete = async (taskId) => {
        if (confirm('Are you sure you want to delete this task? **Deleting a task is permanent and cannot be undone.**')) {
            const response = await fetch(`/690adf9649e1ef455e6d0110/tasks/${taskId}`, { method: 'DELETE' });
            if (response.status === 204) {
                const getResponse = await fetch('/690adf9649e1ef455e6d0110/tasks');
                const data = await getResponse.json();
                setTasks(data.tasks);
            } else {
                alert(`Failed to delete movie with id = ${taskId}, status code = ${response.status}`);
            }
        }
    }

    const onEdit = (task) => {
        setTaskToEdit(task);
        navigate('/editTask');
    }

    return (
        <div className='dashboard'>
            <h2>Tasks</h2>
            <p>So many tasks!</p>
            <button onClick={navToAdd}>+</button>
            <TaskTable tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
        </div>
    )
}

export default Dashboard;