var GameMech = require('./gameMech.js');
var CurrentState = require('./currentState.js');


class Bot {
    makeMove(gamestate) {

        const score = GameMech.getScore(gamestate);

        const movesArray = ['R', 'P', 'S', 'W', 'D'];
        const winningScore = 1000;
        let move;

        const leastRemaining = winningScore - Math.max(score.p1, score.p2);


        const p1Moves = CurrentState.countmoves(gamestate, 'p1');
        const p2Moves = CurrentState.countmoves(gamestate, 'p2');

        const dynamiteDiff = p2Moves.dynamite - p1Moves.dynamite; //Number between -100 and 100

        let oppDynRatio = 0;
        if (p2Moves.dynamite < 100) {
            oppDynRatio = (100-p2Moves.dynamite)/leastRemaining;
        }

        if (oppDynRatio > 0.75 && CurrentState.checkRandom(p2Moves)) {               //If the opponent has a high amount of dynmite left, but not many moves use a water
            return 'W';
        }
        if (dynamiteDiff >= 0 && p2Moves.lastMove !== 'D' && p1Moves.dynamite < 100) {             //If the opponent has used more dynamite than us we should use ours, but not straight after
            if (Math.random() > 0.85) {
                //console.log(`using dyn ${p1Moves.totalMoves}`);
                return 'D';
            }
            
        } 
        if (leastRemaining < 100 && p1Moves.dynamite < 100) {      //If we are running out of time to use dynamite we should use it, but need to improve
            if (Math.random() > 0.8) {
                //console.log(`using dyn ${p1Moves.totalMoves}`);
                return 'D';
            }
        }  
        if (CurrentState.checkRandom(p2Moves)) {
            return CurrentState.againstOppLowestMove(p2Moves, movesArray);          //Plays what would beat the opponents least used move out of rps
        } 
        return GameMech.whatBeats(p2Moves.lastMove, movesArray);                    //Play what would beat the opponents last move
    }
}

module.exports = new Bot();