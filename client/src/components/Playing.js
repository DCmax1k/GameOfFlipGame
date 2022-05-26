import React from 'react';

function Playing(props) {
    return (
        <div className='Playing'>
            Playing {props.game.gamemode} with {props.game.players.length} players
        </div>
    )
}

export default Playing;