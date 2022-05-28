import React from 'react';
import GameOfFlip from './Playing/GameOfFlip';
import AddOn from './Playing/AddOn';
import Numbers from './Playing/Numbers';

class Playing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: props.game,
        }

    }

    render() {
            return (
                <div className='Playing'>
                    { this.state.game.gamemode === 'Game of Flip' && (
                        <GameOfFlip game={this.state.game} setPage={this.props.setPage} allPlayers={this.state.allPlayers} allFlips={this.state.allFlips} />
                    )}
                    { this.state.game.gamemode === 'Add On' && (
                        <AddOn game={this.state.game} setPage={this.props.setPage} />
                    )}
                    { this.state.game.gamemode === '0123' && (
                        <Numbers game={this.state.game} setPage={this.props.setPage} />
                    )}
                </div>
            )
    }
}

export default Playing;