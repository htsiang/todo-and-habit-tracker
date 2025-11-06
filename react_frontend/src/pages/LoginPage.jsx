import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function loginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const loginInfo = {email, password};
        const response = await fetch('/exercises', )
    }

    return (
        <div>
            <h1>My Task Tracker</h1>
            <form className='form'>
                <fieldset>
                    <label className='form-field'><span className='label'>Email:</span>
                        <input type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <br></br>
                    <label className='form-field'><span className='label'>Password:</span>
                        <input type='text' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                </fieldset>
                <buttom onClick={loginUser}>Login</buttom>
            </form>
        </div>
    )
}