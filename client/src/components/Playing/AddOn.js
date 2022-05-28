import React from 'react';

class AddOn extends React.Component {
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
            <div className='AddOn'>
                AddOn
            </div>
        )
    }
}

export default AddOn;