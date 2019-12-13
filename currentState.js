var GameMech = require('./gameMech.js');

class CurrentState {
    constructor() {}

    static countmoves(gamestate, player) {

        let moves = {
            rock: 0,
            paper: 0,
            scissors: 0,
            dynamite: 0,
            water: 0,
            totalMoves: 0,
            lastMove: ''
        };

        gamestate.rounds.forEach(move => {

            switch (move[player]) {
                case 'R':
                    moves.rock++;
                    moves.totalMoves++;
                    moves.lastMove = 'R';
                    break;
                case 'P':
                    moves.paper++;
                    moves.totalMoves++;
                    moves.lastMove = 'P';
                    break;
                case 'S':
                    moves.scissors++;
                    moves.totalMoves++;
                    moves.lastMove = 'S';
                    break;
                case 'D':
                    moves.dynamite++;
                    moves.totalMoves++;
                    moves.lastMove = 'D';
                    break;
                case 'W':
                    moves.water++;
                    moves.totalMoves++;
                    moves.lastMove = 'W';
                    break;
                default:
                    console.log(move[player]);
                    break;
            }
        });

        return moves
    }

    static checkRandom(player) {
        const average = (player.totalMoves - player.dynamite - player.water) / 3;
        const diff = (player.totalMoves - player.dynamite - player.water) * 0.1 //Within 10%
        const min = average - diff;
        const max = average + diff;

        if (
            this.between(player.rock, min, max) &&
            this.between(player.paper, min, max) &&
            this.between(player.scissors, min, max)
        ) {
            return true
        } else {
            return false
        }
    }

    static againstOppLowestMove(p2Moves, movesArray) {
        const p2Arr = Object.values(p2Moves);

            let min = 0;

            for (let i = 0; i < 3; i++) {
                if (p2Arr[i] < p2Arr[min]) {
                    min = i
                }
            }

            return GameMech.whatBeats(movesArray[min], movesArray)

    }

    static between(x, min, max) {
        if (x > min && x < max) {
            return true
        } else {
            return false
        }
    }
}

module.exports = CurrentState;