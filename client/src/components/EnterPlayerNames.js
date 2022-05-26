import React from 'react';
import Player from '../Classes/Player';

function EnterPlayerNames(props) {

    function addPlayer(e) {
        const player = new Player('');
        props.addPlayer(player);
        setTimeout(() => {
            const inputs = document.querySelectorAll('.playerInput > input');
            inputs[inputs.length - 1].select();

            const inputsDiv = document.querySelector('.EnterPlayerNames .inputs');
            inputsDiv.scrollTop = inputsDiv.scrollHeight;
        }, 10);
        
    }

    function removePlayer(index) {
        props.removePlayer(index);
    }

    function editPlayer(index, name) {
        props.editPlayer(index, name);
    }

    function pressEnter(e) {
        if (e.key === 'Enter') {
            addPlayer();
        }
    }

    function goBack() {
        props.setPage('home');
    }
    function next() {
        props.setPage('selectMode');
    }

    return (
        <div className='EnterPlayerNames'>
            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <div className='bigText'>Enter Player <br /> Names</div>
            <div className='inputs'>
            {props.game.players.map((player, index) => {
                return (
                    <div className='playerInput' key={index}>
                        <div className='removePlayer' onClick={() => removePlayer(index)} >x</div>
                        <input type="text" value={player.name} data-index={index} onChange={(e) => editPlayer(index, e.target.value)} onKeyUp={pressEnter}  placeholder="Enter name..." />
                    </div>
                )
            })}
            <div className='addPlayer'>
                <button className='button' onClick={addPlayer}>Add player</button>
            </div>
            </div>
            <div className='bottomButtons'>
                <button className='button back' onClick={goBack}>Back</button>
                <button className='button continue' onClick={next}>Continue</button>
            </div>
        </div>
    )
}

export default EnterPlayerNames;