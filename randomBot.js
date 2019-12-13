class Bot {
    makeMove(gamestate) {

        //Want to add in that if the opponent seems to play randomly we can counter that
        //If so then all opponent moves will approx equal

        const movesArray = ['R', 'P', 'S', 'W', 'D'];
        let move;

        const p1Moves = this.countmoves(gamestate, 'p1');
        const p2Moves = this.countmoves(gamestate, 'p2');

        const dynamiteDiff = p2Moves.dynamite - p1Moves.dynamite; //Number between -100 and 100
        const totalMoves = p1Moves.totalMoves;

        const isP2Random = this.checkRandom(p2Moves);

        if (p1Moves.lastMove === 'D') {
            move = 'W';
        } else if (dynamiteDiff >= 0 && p2Moves.lastMove !== 'D') {
            move = 'D';
        } else if (1000 - p1Moves.totalMoves < 100 && p1Moves.dynamite < 100) {
            move = 'D';
        } else if (isP2Random) {
            move = movesArray[Math.floor(Math.random() * 3)];
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

    checkRandom(player) {
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

    between(x, min, max) {
        if (x > min && x < max) {
            return true
        } else {
            return false
        }
    }
}

module.exports = new Bot();