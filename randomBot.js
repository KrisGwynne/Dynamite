class Bot {
    makeMove(gamestate) {

        const movesArray = ['R', 'P', 'S', 'W', 'D'];
        let move;

        const p1Moves = this.countmoves(gamestate, 'p1');
        const p2Moves = this.countmoves(gamestate, 'p2');

        const dynamiteDiff = p2Moves.dynamite - p1Moves.dynamite; //Number between -100 and 100

        if (p2Moves.totalMoves) {

        }


        if (p1Moves.lastMove === 'D') {
            move = 'W';
        } else if (dynamiteDiff >= 0 && p2Moves.lastMove !== 'D') {
            move = 'D';
        } else {
            switch (p2Moves.lastMove) {
                case 'R':
                    move = 'P';
                    break;
                case 'P':
                    move = 'S';
                    break;
                case 'S':
                    move = 'R';
                    break;
                default:
                    move = movesArray[Math.floor(Math.random() * 3)];
                    break;
            }
        }
        return move;
    }

    countmoves(gamestate, player) {

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
}

module.exports = new Bot();