import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import Help from './pages/Help';

function App() {
    const [taskToEdit, setTaskToEdit] = useState();

    return (
        <>
            <div className='app'>
                <Router>
                    <NavBar />
                    <header>
                        <h1>My Task Tracker</h1>
                        <p>Keep track of your tasks with this task tracker! Plan and prioritize your list to make the most of your time.</p>
                    </header>
                    <Routes>
                        <Route path='/' element={<Dashboard setTaskToEdit={setTaskToEdit} />}></Route>
                        <Route path='/addTask' element={<CreateTaskPage />}></Route>
                        <Route path='/editTask' element={<EditTaskPage taskToEdit={taskToEdit}/>}></Route>
                        <Route path='/help' element={<Help />}></Route>
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App;