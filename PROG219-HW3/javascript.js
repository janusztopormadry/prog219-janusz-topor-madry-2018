//PROG 219, HW-3 Rain
//Written by Janusz Topor-Madry and Doug Cottrill
//Last Modified 21 Apr 2018
//A game using the Crafty.js system

// Some additions to the game:
// Expanded screen height to 500, used left and right-facing player sprite, used rain sprite,
// put background image, added music (non-repeating), 
var screenWidth = 800;
var screenHeight = 500;
var hitCounter = 0;
var playerRight = true;
var lastPlayer1X = 20;

Crafty.init(screenWidth,screenHeight, document.getElementById('game'));

Crafty.sprite("facio_sprite.gif", {facio:[237,0,30,55], facioLeft:[174,68,30,55], raindrop:[143,74,4,10]});
Crafty.e('Floor, 2D, Canvas, Solid, Color, Collision')
  .attr({x: 0, y: 480, w: screenWidth, h: 20})
  .color('lightblue');

var player1 = Crafty.e('Player, 2D, Canvas, Solid, Twoway, Gravity, Collision, facio')
  .attr({x: 20, y: 460, w: 30, h: 55})
  .twoway(150)
  .gravity('Floor')
  .checkHits('LeftWall')
  .bind("HitOn", function(){    // prevent going past left edge and forever falling
    player1.x = 4;              // (=1 or =2 doesn't work right)
  })
  .bind("EnterFrame", function(){
    if (this.x >= screenWidth)
    {
      pause();
      Crafty.e('2D, DOM, Text').attr({x:screenWidth/2 - 4, y:screenHeight/2}).text("Stage&nbsp;1 Clear")
        .textFont({size:'20px', weight:'bold'}).textColor('#e0e0e0');
    }
  });
var hitText = Crafty.e('2D, DOM, Text')
  .attr({
    x: screenWidth - 100,
    y: 10
  });

hitText.text('Hit:&nbsp;' + hitCounter);
hitText.textFont({
  size: '30px',
  weight: 'bold'
  })
  .textColor('#e0e0e0');

Crafty.e('LeftWall, 2D, DOM, Solid')
  .attr({x: 0, y: 0, w: 1, h: screenHeight});

function drop()
{
  var randomx = Math.floor(Math.random() * (screenWidth - 54) + 50); // - 54 to fit in screen
  Crafty.e('Drop, 2D, Canvas, Solid, Gravity, Collision, raindrop')
  .attr({x: randomx, y: 0, w: 4, h: 10})
  .gravity()
  .gravityConst(200)
  .checkHits('Player')
  .bind("HitOn", function(){
    this.destroy();
    hitCounter++;
    if (hitCounter >= 6)
    {
      player1.x = 20;
      hitCounter = 0;
    }
    hitText.text('Hit:&nbsp;' + hitCounter);
  })
  .bind("EnterFrame", function() {
    if (this.y > (screenHeight-40))
      this.destroy();   // destroy object when near floor
  });
}

function pause()
{
  var currMsg = document.getElementById("pauseButton").value;
  if(currMsg=="pause"){
    currMsg="continue";
  }
  else{
    currMsg="pause";
  }

  document.getElementById("pauseButton").value = currMsg;
  Crafty.pause();
}

Crafty.bind("EnterFrame", function(){
//(debug) document.getElementById("message").innerHTML = Crafty.frame();
  
  if (player1.x < lastPlayer1X && playerRight) {
      player1.sprite('facioLeft');   // change to left-facing sprite
      playerRight = ! playerRight;
  }
  else {
    if (player1.x > lastPlayer1X && ! playerRight) {
      player1.sprite('facio');   // change to right-facing sprite
      playerRight = ! playerRight;
    }
  }
  lastPlayer1X = player1.x
  if (Crafty.frame() % 4 == 0)
    drop();
});
