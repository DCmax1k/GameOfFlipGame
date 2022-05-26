import React from 'react';

function GameHome(props) {
    return (
        <div className='GameHome'>
            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <h1 className='bigText'>Flip <br /> Generation</h1>
            <div className='buttons'>
                <button className='button' onClick={props.warmup}>Warmup</button>
                <button className='button' onClick={props.playWithFriends}>Play with friends</button>
            </div>
        </div>
    );
}

export default GameHome;