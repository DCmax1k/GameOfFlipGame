
import gameData from '../components/gameData.json';

class Game {
    constructor() {
        this.page = 'home'; // home, enterPlayerNames, selectMode, playing
        this.players = [];
        this.flips = gameData.typesOfFlips;
        this.gamemode = ''; // "gameOfFlip", "addOn", "numbers"
        this.category = '';
        this.currentPlayer = '';
        this.currentPlayerIndex = 0;
        this.currentRound = 1;
    }

    addPlayer(player) {
        this.players.push(player);
        return this.players;
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p !== player);
        return this.players;
    }

    setPage(page) {
        this.page = page;
        return this.page;
    }

    setMode(mode) {
        this.mode = mode;
        return this.mode;
    }

    setCategory(category) {
        this.category = category;
        return this.category;
    }

    setCurrentPlayerIndex(index) {
        this.currentPlayerIndex = index;
        this.currentPlayer = this.players[index];
    }



}

export default Game;