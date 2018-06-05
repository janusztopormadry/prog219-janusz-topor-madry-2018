// this is the simpliest way to work on it

// This is when our initial screen comes into place lets use this before
Crafty.scene('Loading', function(){
	// Draw some text for the player to see in case the file
	//  takes a noticeable amount of time to load
	Crafty.e('2D, DOM, Text')
		.text('Loading... Plase Wait...')
		.attr({ x: 300, y: Game.height()/2 - 24, w: Game.width() })
		.textFont($text_css)
		.textColor('white');

	// load single mp3 first!
	var assetsObj = {
		"audio": {
			"knock": ['assets/door_knock_3x.mp3', 'assets/door_knock_3x.ogg', 'assets/door_knock_3x.aac'],
			"applause": ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg', 'assets/board_room_applause.aac'],
			//"ring": ['assets/candy_dish_lid.mp3', 'assets/candy_dish_lid.ogg', 'assets/candy_dish_lid.aac'],
			"blaster": ['assets/blaster-firing.mp3'], 
			"chewy": ['assets/chewy_roar.mp3'], 
			"ring": ['assets/rebel-theme.mp3'],
			"loading": ['assets/star-wars-theme-song.mp3'], 			
			"won": ['assets/star-wars-cantina-song.mp3'], 
			"lost": ['assets/imperial_march.mp3']  
		}

// Why the images are not loaded here??
		//"images": [	'assets/16x16_forest_2.gif', 'assets/hunter.png' ]
	};



// ***************************************************************************************
// I will try to cop and paste it again and remake it into loosing scene
// this is what killed me before!
// ***************************************************************************************


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
	// Display some text in celebration of the victory
	Crafty.e('2D, DOM, Text')
	.text('You have safely made to the base.')
	.attr({ x: 300, y: Game.height()/2 - 64, w: Game.width() })
	.textFont($text_css)
	.textColor('white');
	Crafty.e('2D, DOM, Text')
	.text('Please press any key to play again.')
	.attr({ x: 300, y: Game.height()/2 - 24, w: Game.width() })
	.textFont($text_css)
	.textColor('white');

	// First of all stop music fom scene before and then play the next one.
	// I need to remname the ring to something else but for now it works!!
	Crafty.audio.stop('ring');
	Crafty.audio.play('won'); // get the 

	// After a short delay, watch for the player to press a key, then restart
	// the game when a key is pressed
	var delay = true;
	setTimeout(function() { delay = false; }, 5000);
	this.restart_game = function() {
		if (!delay) {
			// since I do not know which audio is playinf I top them both
			Crafty.audio.stop('won');
			Crafty.audio.stop('lost');
			Crafty.scene('Game');
		}
	};
	Crafty.bind('KeyDown', this.restart_game);
}, function() {
	// Remove our event binding from above so that we don't
	//  end up having multiple redundant event watchers after
	//  multiple restarts of the game
	this.unbind('KeyDown', this.restart_game);
});
// ***************************************************************************************
// this where the won scene should end aand after I copy and paste it I shuld be able to call this in aa test
// why did it brake??
// ***************************************************************************************

	Crafty.load( assetsObj, function(){
		// Once the images are loaded...
		// Define the individual sprites in the image
		// Each one (spr_tree, etc.) becomes a component
		// These components' names are prefixed with "spr_"
		//  to remind us that they simply cause the entity
		//  to be drawn with a certain sprite
		Crafty.sprite(15, 'assets/16x16_forest_2.gif', {
			spr_tree:    [0, 0],
			spr_bush:    [1, 0],
			spr_village: [0, 1],
			spr_rock:    [1, 1]
		});

		// Define the PC's sprite to be the first sprite in the third row of the
		//  animation sprite map
		/* Crafty.sprite(32, 'assets/hunter.png', {
			spr_player:  [0, 2],
		}, 0, 2); */
		//Crafty.sprite(120, 120, 'assets/images/falcon_up.png', {

		// NOTE THIS JUST GETS THE SPRITE NO EDGES NO BUFFER.
		// IT NEEDS EXACT PIX SIZE
		Crafty.sprite(35, 35, 'assets/images/falcon_up.png', {
			spr_player:  [0, 0],
		}, 0, 0);
		Crafty.sprite(139, 130, 'assets/images/base.png', {
			spr_base:  [0, 0],
		},0,0);
		Crafty.sprite(100, 97, 'assets/images/death-star.png', {
			spr_death:  [0, 0],
		},0,0);

		
		// Now that our sprites are ready to draw, start the game
		Crafty.scene('Game');
	});
});