import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import sendData from './sendData';

import '../stylesheets/IndexPage.css';

function LoginPage() {

    useEffect(() => {
        (async function check() {
            try {
                const checkLogin = await sendData('/checklogin', {});
                if (checkLogin.status === 'success') {
                    window.location.href = `/${checkLogin.redirect}`;
                } 
            } catch(err) {
                console.error(err);
            }
        })();
    }, []);



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [userActive, setUserActive] = useState('');
    const [passActive, setPassActive] = useState('');

    const [loginText, setLoginText] = useState('Submit');

    const changeUsername = e => {
        setUsername(e.target.value);
        e.target.value.length > 0 ? setUserActive('active') : setUserActive('');
    }
    const changePassword = e => {
        setPassword(e.target.value);
        e.target.value.length > 0 ? setPassActive('active') : setPassActive('');
    }

    const submit = async () => {
        if (!username || !password) return alert('Please fill in all fields.');
        setLoginText('Logging in...');
        const response = await sendData('/login', {username, password});
        if (response.status !== 'success') {
            setLoginText('Submit');
            return alert(response.message);
        }
        if (response.status === 'success') return window.location.href = `/${response.redirect}`;
    }


    return (
        <div className='LoginPage'>
            <Link to={'/'} className="backArrow" >
                <i class="fa-solid fa-arrow-left"></i> Back
            </Link>
            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <h1 className='bigText'>Log in</h1>
            <div className='inputs'>
                <div className='input'>
                    <span className={`placeholder ${userActive}`}>Username</span>
                    <input type='text' onChange={changeUsername} />
                </div>
                <div className='input'>
                    <span className={`placeholder ${passActive}`}>Password</span>
                    <input type='password' onChange={changePassword} />
                </div>
            </div>
            <div className='submit button' onClick={submit}>
                {loginText}
            </div>
        </div>
    )
}

export default LoginPage;