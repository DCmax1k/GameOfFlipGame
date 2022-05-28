import React from 'react';
class Player {
    constructor(name, index)  {
        this.name = name;
        this.letters = []; //['F', 'L', 'I', 'P'];
        this.index = index;
    }
}

function EnterPlayerNames(props) {

    function addPlayer(e) {
        const player = new Player('', props.game.players[props.game.players.length - 1].index + 1);
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
        const players = props.game.players.filter(p => p.name !== '');
        if (players.length <= 1) return alert('You need at least 2 players to play');
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