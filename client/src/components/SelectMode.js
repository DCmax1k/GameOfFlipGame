import React from 'react';

function SelectMode(props) {


    function goBack() {
        props.setPage('enterPlayerNames');
    }

    function setGamemode(mode) {
        props.setGamemode(mode);
    }

    return (
        <div className='SelectMode'>
            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <div className='bigText'>Select <br /> Gamemode</div>
            <div className='modes'>
            {props.modeOptions.map((mode, index) => {
                return (
                    <div className='modeOption' key={index}>
                        <button className={`modeName button ${mode!=='Game of Flip'?'disabled':null}`} onClick={() => setGamemode(mode) }>{mode}</button>
                    </div>
                )})
            }
            </div>

            <div className='bottomButtons'>
                <button className='button back' onClick={goBack}>Back</button>
            </div>
        </div>
    )
}

export default SelectMode;