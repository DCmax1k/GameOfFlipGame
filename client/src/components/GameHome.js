import React, {useState} from 'react';
import sendData from './sendData';

function GameHome(props) {

    const [adminMenu, setAdminMenu] = useState(false);
    const [alertHeaderText, setAlertHeaderText] = useState('');
    const [alertMessageText, setAlertMessageText] = useState('');

    function toggleMenu() {
        setAdminMenu(!adminMenu);
    }

    function sendAlert() {
        sendData('/appalert/update', {
            title: alertHeaderText,
            message: alertMessageText,
        });
    }
    const changeHeader = (e) => {
        setAlertHeaderText(e.target.value);
    }
    const changeMessage = (e) => {
        setAlertMessageText(e.target.value);
    }

    const logout = async () => {
        await sendData('/login/logout', {});
        window.location.href = '/';
    }

    const rankChange = async (u) => {
        const changeRank = await sendData('/login/paidchange', {
            username: u,
        });
        if (changeRank.status === 'success') {
            alert('Successfully gifted app!');
        }
    }

    return (
        <div className='GameHome'>

            {props.user.rank === 'admin' && (
                <div style={{position: 'absolute', top: '10px', right: '10px'}}>
                    <button onClick={toggleMenu}>ShowAdminMenu</button>
                </div>
            )}

            <div className={`adminMenu ${adminMenu?'active':''}`} style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}}>
                        <button style={{position: 'absolute', top: '10px', right: '10px'}} onClick={toggleMenu}>x</button>
                        <h1>Admin Menu</h1>
                        <input onChange={changeHeader} value={alertHeaderText} placeholder='App alert header' />
                        <input onChange={changeMessage} value={alertMessageText} placeholder='App alert message' />
                        <button onClick={sendAlert}>Update</button>

                        <hr />

                        {/* All users shown with a button */}
                        <h2>All users</h2>
                        {props.allUsers.map((user, index) => (
                            <div key={index}>{user.username} - {user.rank} <button style={{display: user.boughtApp ? 'none' : 'inline-block'}} onClick={() => rankChange(user.username)}>Gift</button></div>
                        ))}

                

            </div>

            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <h1 className='bigText'>Flip <br /> Generator</h1>
            <div className='buttons'>
                <button className='button' onClick={props.warmup}>Warmup</button>
                <button className='button' onClick={props.playWithFriends}>Play with friends</button>
                <button className='button' style={{height: 20, fontSize: 13}} onClick={logout}>Log out</button>
            </div>
        </div>
    );
}

export default GameHome;