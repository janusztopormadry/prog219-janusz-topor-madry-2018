// The die object
let die = {
     roll: function() {
        return Math.ceil(Math.random() * 6);
    },
};
// the game logic object
let GameLogic = {
    die1: 0,
	die2: 0,

    checkWinner: function() {
        GameLogic.die1 = die.roll();
        GameLogic.die2 = die.roll();
        let winner = false;
        let sum = GameLogic.die1 + GameLogic.die2;
        if (sum === 11 || sum === 7) {
            winner = true;
        }
        return winner;
    },
};
// JavaScript source code
