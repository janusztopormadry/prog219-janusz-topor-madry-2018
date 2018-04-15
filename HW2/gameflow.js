
// Player object
let Player = function(pName, pNumber) {
    this.winnerStatus = false;
    this.name = pName;
    this.purse = 5;
    this.number = pNumber;
    this.totalRolls = 0;
	this.isLooser = false;
};

let player1 = new Player('Player1', 1);
let player2 = new Player('Josh', 2);
let player3 = new Player('Megan', 3);
let clicks = 0;
let loosers = 0;
let currentPlayer='';
play = function() {
    clicks++;
    if (clicks % 3 ===0) {
		if (player3.purse!=0){
			player3.totalRolls++;
			if (GameLogic.checkWinner()) {
				player3.purse++;
				currentPlayer = player3.name;
				$('#status').text(player3.name +' WIN');
			} 
			else {
				player3.purse--;
				$('#status').text(player3.name + ' LOST');
			}
		}
		else{
			if(!player3.isLooser)
				{
					loosers++;
					player3.isLooser = true;
				}
			play();
		}
    } 
	else if (clicks % 3 ===2) {
		if (player2.purse!=0){
			player2.totalRolls++;
			if (GameLogic.checkWinner()) {
				player2.purse++;
				currentPlayer = player2.name;
				$('#status').text(player2.name +' WIN');
			} else {
				player2.purse--;
				$('#status').text(player2.name + ' LOST');
			}
		}
		else{
			if(!player2.isLooser)
				{
					loosers++;
					player2.isLooser = true;
				}
				play();
		}
    } 
	else {
		if (player1.purse!=0){
			player1.totalRolls++;
			if (GameLogic.checkWinner()) {
				player1.purse++;
				currentPlayer = player1.name;
				$('#status').text(player1.name +' WIN');
			} else {
				player1.purse--;
				$('#status').text(player1.name + ' LOST');
			}
		}
		else{
				if(!player1.isLooser)
				{
					loosers++;
					player1.isLooser = true;
				}
				play();
		}
    }

    // Swap images with die roll
    $('#image1').attr('src', './images/dice-' + GameLogic.die1 + '.jpg');
    $('#image2').attr('src', './images/dice-' + GameLogic.die2 + '.jpg');
  
    $('body > p:nth-of-type(2) > .balance').text(player1.purse);
    $('body > p:nth-of-type(2) > .turnCount').text(player1.totalRolls);
    $('body > p:nth-of-type(3) > .balance').text(player2.purse);
    $('body > p:nth-of-type(3) > .turnCount').text(player2.totalRolls);
    $('body > p:nth-of-type(4) > .balance').text(player3.purse);
    $('body > p:nth-of-type(4) > .turnCount').text(player3.totalRolls);
	 if (loosers===2) {
		$('#ButtonBet').attr('disabled', 'true');
        $('#status').text('GAME OVER! ' + currentPlayer +' is a WINNER!');
	}
};

// Display output

$('body h3:first-of-type').text(player1.name);
$('body h3:nth-of-type(2)').text(player2.name);
$('body h3:last-of-type').text(player3.name);

