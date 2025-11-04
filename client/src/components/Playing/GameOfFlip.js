import React from 'react';
import '../../stylesheets/GameOfFlipPage.css';

class GameOfFlip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: props.game.players,
            playersOut: [],
            currentPlayer: props.game.players[0],
            currentPlayerIndex: 0,
            currentRound: 1,
            currentFlip: null,
            flipsList: props.game.flips,
            flipsUsed: [],
            playingSuccessAni: false,
            playingFailAni: false,
            winner: '',
            scoresMenuActive: false,
        }
        this.nextPlayer = this.nextPlayer.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.pickFlip = this.pickFlip.bind(this);
        this.successFlip = this.successFlip.bind(this);
        this.failFlip = this.failFlip.bind(this);
        this.addLetter = this.addLetter.bind(this);
        this.exitGame = this.exitGame.bind(this);
        this.toggleScoresMenu = this.toggleScoresMenu.bind(this);
        this.endGame = this.endGame.bind(this);
        this.showVictoryMessage = this.showVictoryMessage.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentDidMount() {
        this.resetGame();
    }

    resetGame() {
        const oldPlayers = this.state.players;
        const playersOut = this.state.playersOut;
        const players = [...oldPlayers, ...playersOut];

        const oldFlipsList = this.state.flipsList;
        const flipsUsed = this.state.flipsUsed;
        const flipsList = [...oldFlipsList, ...flipsUsed]

        const firstFlip = flipsList.splice(Math.floor(Math.random() * flipsList.length), 1)[0];
        flipsUsed.push(firstFlip);
        flipsList.splice(flipsList.indexOf(firstFlip), 1);

        console.log(flipsList);
        console.log(flipsUsed);

        this.setState({
            players: players.map(player => {
                player.letters = [];
                return player;
            }),
            playersOut: [],
            currentPlayer: players[0],
            currentPlayerIndex: 0,
            currentRound: 1,
            flipsList: flipsList,
            flipsUsed: [],
            currentFlip: firstFlip,
            winner: '',
            scoresMenuActive: false,
        });
    }

    nextPlayer() {
        let nextPlayerIndex = this.state.currentPlayerIndex + 1;
        if (nextPlayerIndex >= this.state.players.length) {
            nextPlayerIndex = 0;
            this.nextRound();
        }
        this.setState({
            currentPlayerIndex: nextPlayerIndex,
            currentPlayer: this.state.players[nextPlayerIndex],
        });
    }

    nextRound() {
        this.setState({
            currentRound: this.state.currentRound + 1,
            currentFlip: this.pickFlip(),
        });
    }

    pickFlip() {
        const flips = this.state.flipsList;
        const flipsUsed = this.state.flipsUsed;
        const flip = flips.splice(Math.floor(Math.random() * flips.length), 1)[0];
        flipsUsed.push(flip);
        if (flips.length === 0) {
            this.setState({
                flipsList: flipsUsed,
                flipsUsed: [],
            })
        } else {
            this.setState({
                flipsList: flips,
                flipsUsed: flipsUsed,

            })
        }
        console.log('flip', flip);
        return flip;
    }

    successFlip() {
        console.log("The winner: ", this.state.winner);
        if (this.state.winner) return;
        if (this.state.playingSuccessAni) return;
        this.setState({
            playingSuccessAni: true,
        });
        setTimeout(() => {
            this.setState({
                playingSuccessAni: false,
            });
            this.nextPlayer();
        }, 500);
    }
    failFlip() {
        console.log("The winner: ", this.state.winner);
        if (this.state.winner) return;
        if (this.state.playingFailAni) return;
        const currentPlayerIndex = this.state.currentPlayerIndex;
        const removedPlayer = this.addLetter(currentPlayerIndex);
        this.setState({
            playingFailAni: true,
            currentPlayerIndex: removedPlayer?currentPlayerIndex-1:currentPlayerIndex,
        });
        
        setTimeout(() => {
            this.setState({
                playingFailAni: false,
            });
            this.nextPlayer();
        }, 500);
    }
    addLetter(playerIndex) {
        const players = this.state.players;
        const playersOut = this.state.playersOut;
        const player = players[playerIndex];
        let playerDisqualified = false;
        switch(player.letters.length) {
            case 0:
                player.letters.push('F');
                break;
            case 1:
                player.letters.push('L');
                break;
            case 2:
                player.letters.push('I');
                break;
            case 3:
                player.letters.push('P');
                playerDisqualified = true;
                break;
            default:
                break;
        }
        players[playerIndex] = player;
        this.setState({
            players: players,
            playersOut: playersOut,
        });
        if (playerDisqualified) {
            setTimeout(() => {
                const removedPlayer = players.splice(playerIndex, 1)[0];
                console.log('removing', removedPlayer);
                removedPlayer.letters = [];
                playersOut.push(removedPlayer);
                if (players.length === 1) return this.endGame();
            }, 500);
            return true;
        }
    }

    exitGame() {
        const confirming = window.confirm('Are you sure you want to exit the game?');
        if (confirming) {
            this.props.setPage('selectMode');
        }
    }
    endGame() {
        this.showVictoryMessage(this.state.players[0].name);
    }

    showVictoryMessage(winner) {
        this.setState({
            winner: winner,
        });
    }

    toggleScoresMenu() {
        this.setState({
            scoresMenuActive: !this.state.scoresMenuActive,
        });
    }

    render() {
        return (
            <div className='GameOfFlip'>

                {/* SCORES MENU */}
                <div className={`showScores ${this.state.scoresMenuActive?'active':''}`}>
                    <button onClick={this.toggleScoresMenu} className='exitMenu'>x</button>
                    <div className='bigText'>All players <br /> scores:</div>
                    <div className='players'>
                        {this.state.players.map((player, index) => {
                            return (
                                <div className='player' key={index}>
                                    <div className='playerName bigText'>{player.name}</div>
                                    <div className='playerLetters'>
                                        <span className={player.letters.length>=1?'fill':''} >F</span>
                                        <span className={player.letters.length>=2?'fill':''} >L</span>
                                        <span className={player.letters.length>=3?'fill':''} >I</span>
                                        <span className={player.letters.length>=4?'fill':''} >P</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CROWN VICTORY */}
                <div className={`victoryMessage ${this.state.winner?'active':''}`}>
                    <i className="fa-solid fa-crown"></i>
                    <h1>{this.state.winner}</h1>
                    <button onClick={this.resetGame}>Play again</button>
                </div>

                {/* HEADER */}
                <div className='header'>
                    <div className='exit'>
                        <button className='stackedBtn' onClick={this.exitGame}>
                            <i className="fa-solid fa-arrow-left"></i>
                            <span>Exit</span>
                        </button>
                    </div>
                    <div className='title'>
                        <h1 className='bigText'>Round {this.state.currentRound}</h1>
                    </div>
                    <div className='scoresBtn'>
                        <button className='stackedBtn' onClick={this.toggleScoresMenu}>
                            <i className="fa-solid fa-ellipsis"></i>
                            <span>Scores</span>
                        </button>
                    </div>
                </div>

                {/* Player that is currently up */}
                <div className='currentPlayer'>
                    <h2 className='bigText'>{this.state.currentPlayer.name}</h2>
                    <div className='letters'>
                        <span className={this.state.currentPlayer.letters.length>=1?'fill':''} >F</span>
                        <span className={this.state.currentPlayer.letters.length>=2?'fill':''} >L</span>
                        <span className={this.state.currentPlayer.letters.length>=3?'fill':''} >I</span>
                        <span className={this.state.currentPlayer.letters.length>=4?'fill':''} >P</span>
                    </div>
                    <div className="buttons">
                        <button className={`failure button ${this.state.playingFailAni?'vibrate':''}`} onClick={this.failFlip}>
                            <i className="fa-solid fa-times"></i>
                        </button>
                        <button className={`success button ${this.state.playingSuccessAni?'bounce':''}`} onClick={this.successFlip}>
                            <i className="fa-solid fa-check"></i>
                        </button>
                    </div>
                </div>

                {/* Show Flip */}
                {console.log(this.props)}
                <div className='flip'>
                    <img src={this.props.images[4]} alt='Flip img' />
                    <h1 className='bigText'>{this.state.currentFlip}</h1>
                </div>


                
            </div>
        )
    }
}

export default GameOfFlip;