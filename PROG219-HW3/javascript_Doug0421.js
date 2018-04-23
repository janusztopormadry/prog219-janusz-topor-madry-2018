//PROG 219, HW-3 Rain
//Written by Janusz Topor-Madry and Doug Cottrill
//Last Modified 21 Apr 2018
//A game using the Crafty.js system

var screenWidth = 800;
var screenHeight = 400;
var hitCounter = 0;

Crafty.init(screenWidth,screenHeight,document.getElementById('game'));

var player1 = Crafty.e('Player, 2D, Canvas, Color, Solid, Twoway, Gravity, Collision')
  .attr({x: 20, y: 358, w: 16, h: 32})
  .color('#F00').twoway(100).gravity('Floor')
  .gravityConst(1000)
  .checkHits('LeftWall')
  .bind("HitOn", function(){    // prevent going past left edge and forever falling
    player1.x = 4;              // (lower than 4 doesn't work right)
  })
  .bind("EnterFrame", function(){
    if (this.x == screenWidth)
      {
        pause();
        Crafty.e('2D, DOM, Text').attr({x:screenWidth/2, y:screenHeight/2}).text("Stage 1 Clear").textFont({size:'20px', weight:'bold'});
      }
   });

var hitText = Crafty.e('2D, DOM, Text')
  .attr({
    x: screenWidth - 140,
    y: 10
});

hitText.text('Hit:&nbsp;' + hitCounter);
hitText.textFont({
size: '30px',
weight: 'bold'
});

Crafty.e('Floor, 2D, DOM, Color')
  .attr({x: 0, y: 390, w: screenWidth, h: 10})
  .color('lightblue');

Crafty.e('LeftWall, 2D, DOM, Color, Solid')
.attr({x: 0, y: 0, w: 1, h: screenHeight})
.color('#FFFFFF');

function drop() {
  var random_x = Math.floor(Math.random() * (screenWidth - 52) + 50); // - 52 to fit in screen
  Crafty.e('Drop, 2D, Canvas, Color, Solid, Gravity, Collision')
  .attr({x: random_x, y: 0, w: 2, h: 10})
  .color('#000080')
  .gravity()
  .gravityConst(200)
  .checkHits('Player')
  .bind("EnterFrame", function() {
      if (this.y > screenHeight)
        this.destroy();
  })
  .bind("HitOn", function(){
    this.destroy();
    hitCounter++;
    hitText.text('Hit:&nbsp;' + hitCounter);
    if (hitCounter >= 6)
    {
      player1.x = 20;
      hitCounter = 0;
      hitText.text("Hit: " + hitCounter);
    }
  });
}

function pause() {
  Crafty.pause();
}

Crafty.bind("EnterFrame", function() {
  if (Crafty.frame() % 4 == 0)
    drop();
})
