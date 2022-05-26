import React, {useEffect, useState} from 'react';
import sendData from './sendData';

function PaymentPage() {

    useEffect(() => {
        (async function check() {
            try {
                const checkLogin = await sendData('/checklogin', {});
                if (checkLogin.status !== 'success') {
                    window.location.href = `/`;
                } else if (checkLogin.redirect === 'game') {
                    window.location.href = `/game`;
                } else {
                    setUser(checkLogin.user);
                }
            } catch(err) {
                console.error(err);
            }
        })();
    }, []);

    const [user, setUser] = useState('');

    return (
        <div className='PaymentPage'>
            PaymentPage for {user.username}
        </div>
    )
}

export default PaymentPage;