// Part I set upt the grid all the sizes css use START TO ACTUALLY START THE GAME
// initialize it with grit components, backgraoun and send it to scene loading.
// one more function here is to wait between  Loading screne and the next one.
Game = {
	// This defines our grid's size and the size of each of its tiles
	// 24 long 16 height with tiles 36X36 864px X 576px we can do better!
	// it is the size for all windows.
	map_grid: {
		width:  24,
		height: 16,
		tile: {
			width:  36,
			height: 36
		}
	},

	// The total width of the game screen. 
	width: function() {
		return this.map_grid.width * this.map_grid.tile.width;
	},

	// The total height of the game screen. 
	height: function() {
		return this.map_grid.height * this.map_grid.tile.height;
	},

		// Start crafty and set a background color so that we can see first scene.
		start: function() {
		Crafty.init(Game.width(), Game.height());
		Crafty.background('url(bg_sky2.gif) no-repeat');
	//Crafty.background('#fa1255'); //IN case we need a bg color
		Crafty.scene('Loading');
	}
};

// this is not necessary here, but if I remofe it the code using it later will brake
// I should use css fot it.  Not wasing my time here.
$text_css = {'size': '24px'};

// This changes with attribute as a parameter if it is 1e8, 1e7 is shorter
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
  }