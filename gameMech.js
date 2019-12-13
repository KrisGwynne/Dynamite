class GameMech {
    constructor() {}

    static getScore(gamestate) {

        let score = {
            p1: 0,
            p2: 0
        }
        let drawScore = 1;

        gamestate.rounds.forEach(move => {

            const result = this.getWinner(move.p1, move.p2)

            if (result === 'true') {
                score.p1 += drawScore;
                drawScore = 1;
            } else if (result === 'false') {
                score.p2 += drawScore;
                drawScore = 1;
            } else {
                drawScore++;
            }
        });

        return score
    }

    static getWinner(moveA, moveB) {

        if (moveA === moveB) {
            return 'draw';
        } else if (
            (moveA === 'D' && (moveB !== 'W')) ||
            (moveA === 'R' && (moveB !== 'P' || moveB !== 'D')) ||
            (moveA === 'P' && (moveB !== 'S' || moveB !== 'D')) ||
            (moveA === 'S' && (moveB !== 'R' || moveB !== 'D')) ||
            (moveA === 'W' && (moveB == 'D'))
        ) {
            return 'true';
        } else {
            return 'false';
        }
    }

    static whatBeats(move, movesArray) {
        switch (move) {
            case 'R':
                return 'P';
                break;
            case 'P':
                return 'S';
                break;
            case 'S':
                return 'R';
                break;
            default:
                return movesArray[Math.floor(Math.random() * 3)];
                break;
        }
    }
}

module.exports = GameMech;