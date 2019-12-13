var CurrentState = require('./currentState.js');

class Bot {
    makeMove(gamestate) {
        const movesArray = ['R', 'P', 'S', 'W', 'D'];

        const p1Moves = CurrentState.countmoves(gamestate, 'p1');
        let num;

        if (p1Moves.dynamite < 100) {
            num = 5;
        } else {
            num = 3
        }

        return movesArray[Math.floor(Math.random() * num)];
        //return 'W';
    }
}

module.exports = new Bot();
