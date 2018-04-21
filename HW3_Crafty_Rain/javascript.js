var screenWidth = 800;
var screenHeight = 500;
var hitCounter = 0;

Crafty.init(screenWidth,screenHeight, document.getElementById('game'));

Crafty.sprite("facio_sprite.png", {facio:[0,0,30,55]});
Crafty.e('Floor, 2D, Canvas, Solid, Color, Collision')
    .attr({x: 0, y: 480, w: screenWidth * 2, h: 20})
    .color('lightblue');
Crafty.e('ScreenSide, 2D, Canvas, Solid, Color, Collision')
.attr({x: 0, y: 480, w: screenWidth * 2, h: 20})
.color('lightblue');

  var player1 = Crafty.e('Player, 2D, Canvas, Solid, Twoway, Gravity, Collision, facio')
    .attr({x: 20, y: 460, w: 30, h: 55})
    .twoway(150)
    .gravity('Floor')
    .bind("EnterFrame", function(){
      if (this.x == screenWidth)
      {
        pause();
        Crafty.e('2D, DOM, Text').attr({x:screenWidth/2, y:screenHeight/2}).text("Stage 1 Clear").textFont({size:'20px', weight:'bold'});
      }
    });
var hitText = Crafty.e('2D, DOM, Text')
.attr({
x: screenWidth - 100,
y: 10
});

hitText.text('Hit:' + hitCounter);

hitText.textFont({
size: '30px',
weight: 'bold'
});

function drop()
{
var randomx = Math.floor((Math.random() * screenWidth));
Crafty.e('Drop, 2D, Canvas, Solid, Gravity, Collision, facio')
    .attr({x: randomx, y: 0, w: 20, h: 15})
    //.color('#aa33ff')
    .gravity()
    .checkHits('Player')
    .bind("HitOn", function(){
        this.destroy();
        hitCounter++;
        hitText.text("Hit: " + hitCounter);

        if (hitCounter == 6)
        {
          player1.x = 20;
          hitCounter = 0;
          hitText.text("Hit: " + hitCounter);
        }
    })
    .bind("EnterFrame", function() {
        if (this.y > (screenHeight-50))
          this.destroy();
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
document.getElementById("message").innerHTML = Crafty.frame();

if (Crafty.frame() % 4 == 0)
drop();
});
