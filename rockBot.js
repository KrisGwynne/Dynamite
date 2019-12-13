class Bot {
    makeMove(gamestate) {
        const movesArray = ['R', 'P', 'S', 'W', 'D'];
        return movesArray[Math.floor(Math.random() * 3)];
        //return 'R';
    }
}

module.exports = new Bot();
