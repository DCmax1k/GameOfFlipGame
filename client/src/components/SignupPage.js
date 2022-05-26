import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import sendData from './sendData';

import '../stylesheets/IndexPage.css';

function SignupPage() {

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
    const [email, setEmail] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [userActive, setUserActive] = useState('');
    const [passActive, setPassActive] = useState('');
    const [emailActive, setEmailActive] = useState('');
    const [confirmActive, setConfirmActive] = useState('');

    const changeUsername = e => {
        setUsername(e.target.value);
        e.target.value.length > 0 ? setUserActive('active') : setUserActive('');
    }
    const changePassword = e => {
        setPassword(e.target.value);
        e.target.value.length > 0 ? setPassActive('active') : setPassActive('');
    }
    const changeEmail = e => {
        setEmail(e.target.value);
        e.target.value.length > 0 ? setEmailActive('active') : setEmailActive('');
    }
    const changeConfirmPass = e => {
        setConfirmPass(e.target.value);
        e.target.value.length > 0 ? setConfirmActive('active') : setConfirmActive('');
    }


    const submit = async () => {
        if (!username || !password || !email || !confirmPass ) return alert('Please fill in all fields.');
        if (password !== confirmPass) return alert('Passwords do not match.');
        const response = await sendData('/signup', {username, password, email});
        if (response.status !== 'success') return alert(response.message);
        if (response.status === 'success') return window.location.href = '/payment';
    }

    return (
        <div className='SignupPage'>
            <Link to={'/'} className="backArrow" >
                <i class="fa-solid fa-arrow-left"></i> Back
            </Link>
            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <h1 className='bigText'>Sign up</h1>
            <div className='inputs'>
                <div className='input'>
                    <span className={`placeholder ${userActive}`}>Username</span>
                    <input type='text' onChange={changeUsername} />
                </div>
                <div className='input'>
                    <span className={`placeholder ${emailActive}`}>Email</span>
                    <input type='email' onChange={changeEmail} />
                </div>
                <div className='input'>
                    <span className={`placeholder ${passActive}`}>Password</span>
                    <input type='password' onChange={changePassword} />
                </div>
                <div className='input'>
                    <span className={`placeholder ${confirmActive}`}>Confirm Password</span>
                    <input type='password' onChange={changeConfirmPass} />
                </div>
            </div>
            <div className='submit button' onClick={submit}>
                Submit
            </div>
        </div>
    )
}

export default SignupPage;