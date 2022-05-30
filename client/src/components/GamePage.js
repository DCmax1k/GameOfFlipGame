import React from 'react';
// eslint-disable-next-line
import sendData from './sendData';
import '../stylesheets/GamePage.css';
import gameData from './gameData.json';

import GameHome from './GameHome';
import Warmup from './Warmup';
import EnterPlayerNames from './EnterPlayerNames';
import SelectMode from './SelectMode';
import Playing from './Playing';

class Player {
    constructor(name, index)  {
        this.name = name;
        this.letters = []; //['F', 'L', 'I', 'P'];
        this.index = index;
    }
}

export default class GamePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {
                page: '', // home, enterPlayerNames, selectMode, playing
                players: [],
                flips: gameData.typesOfFlips,
                gamemode: '', // "Game of Flip", "Add On", "numbers"
                category: '',
            },
            user: {},
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.warmup = this.warmup.bind(this);
        this.playWithFriends = this.playWithFriends.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.editPlayer = this.editPlayer.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setGamemode = this.setGamemode.bind(this);

    }

    async componentDidMount() {
        try {
            const checkLogin = await sendData('/checklogin', {});
            //const checkLogin = {status: 'success', redirect: 'game', user: {username: 'test'}}; // TESTING PURPOSES ONLY

            if (checkLogin.status !== 'success') {
                window.location.href = `/`;
            } else if (checkLogin.redirect === 'payment') {
                window.location.href = `/payment`;
            } else {
                //this.setUser(checkLogin.user);
                this.setState({user: checkLogin.user, game: {...this.state.game, page: 'home'}});
            }

        } catch(err) {
            console.error(err);
        }
    }

    warmup() {
        this.setState(
            {game: {...this.state.game, page: 'warmup'}}
        );
    }
    playWithFriends() {
        const player = new Player(this.state.user.username, 0);
        this.setState({
            game: {
            ...this.state.game, players: [player], page: 'enterPlayerNames'
            }
        });
    }
    addPlayer(player) {
        const newPlayers = [...this.state.game.players, player];
        this.setState({
            game: {
                ...this.state.game, players: newPlayers,
            }
        })
    }
    removePlayer(index) {
        this.state.game.players.splice(index, 1)
        const players = this.state.game.players;
        this.setState({
            game: {
                ...this.state.game, players: players,
            }
        })
    }
    editPlayer(index, name) {
        const players = this.state.game.players;
        players[index].name = name;
        this.setState({
            game: {
                ...this.state.game, players: players,
            }
        })
    }
    setPage(page) {
        const players = this.state.game.players.filter(p => p.name !== '');
        this.setState({
            game: {
                ...this.state.game, page: page, players: players,
            }
        });
    }
    setGamemode(gamemode) {
        this.setState({
            game: {
                ...this.state.game, gamemode: gamemode, page: 'playing',
            }
        });
    }

    render() {
        return (
            <div className='GamePage'>

                { this.state.game.page === 'home' ? (
                    <GameHome warmup={this.warmup} playWithFriends={this.playWithFriends} />
                ) : null
                }
                { this.state.game.page === 'warmup' ? (
                    <Warmup 
                        setPage={this.setPage}
                    />
                ) : null
                }
                { this.state.game.page === 'enterPlayerNames' ? (
                    <EnterPlayerNames
                        game={this.state.game}
                        user={this.state.user}
                        addPlayer={this.addPlayer}
                        removePlayer={this.removePlayer}
                        editPlayer={this.editPlayer}
                        setPage={this.setPage}
                    />
                ) : null
                }
                { this.state.game.page === 'selectMode' ? (
                    <SelectMode
                        game={this.state.game}
                        user={this.state.user}
                        setPage={this.setPage}
                        modeOptions={gameData.gameModes}
                        setGamemode={this.setGamemode}
                    />
                ) : null
                }
                {this.state.game.page === 'playing' ? (
                    <Playing
                        game={this.state.game}
                        user={this.state.user}
                        setPage={this.setPage}

                    />
                ) : null
                }


                <footer>Logged in as {this.state.user.username}</footer>

            </div>
        )
    }
}