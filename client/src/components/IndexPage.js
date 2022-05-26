import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/IndexPage.css';

import sendData from './sendData';

function IndexPage() {

    useEffect(() => {
        (async function check() {
            try {
                const checkLogin = await sendData('/checklogin', {});
                if (checkLogin.status === 'success') {
                    window.location.href = `/${checkLogin.redirect}`;
                } else {
                    setConnecting(false);
                }
            } catch(err) {
                console.error(err);
            }
        })();
    }, []);

    const [connecting, setConnecting] = useState(true);

    return (
        <div className='IndexPage'>
            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <h1 className='bigText'>Flip <br /> Generator</h1>
            { connecting ? <div className='connecting'>Connecting...</div> : (
                <div className='buttons'>
                    <Link to='/signup' className='button signup'>Sign up</Link>
                    <Link to='/login' className='button login'>Log in</Link>
                </div>
            )}
        </div>
    );
}

export default IndexPage;