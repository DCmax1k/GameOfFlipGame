import React from 'react';

class Numbers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: props.game.players,
            currentPlayer: '',
            currentPlayerIndex: 0,
            currentRound: 1,
            flipsList: props.game.flps,
        }
    }

    render() {
        return (
            <div className='Numbers'>
                Nubmers
            </div>
        )
    }
}

export default Numbers;