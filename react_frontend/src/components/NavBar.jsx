import { Link } from 'react-router-dom';
import '../App.css';

function NavBar(){
    return (
        <nav className='App-nav'>
            <Link to='/' className='link'>Dashboard</Link>
            <Link to='/addTask' className='link'>Add Task</Link>
            <Link to='/help' className='link'>Help</Link>
        </nav>
    )
}

export default NavBar;