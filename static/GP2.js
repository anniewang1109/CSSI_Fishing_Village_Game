var ctx = document.getElementById('canvas').getContext('2d');
var fish_width = 32;
var fish_height = 32;

function full_canvas(){
  var canvas = document.getElementById("canvas")
  let width = screen.innerWidth
  let height = screen.innerHeight
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

function draw_fish(src, frame,x,y){
  var img = new Image();
  img.src = src;
  img.onload = function() {
    ctx.drawImage(img,frame*32,32,32,32, x,y,32,32);
  }
}

function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

let f = 0;
function swim(fish_key){
  f = (f+1)%4;
  fish = fishArr[fish_key];
  SSF = fish.getSSF();
  clear_fish(fish.xPos,fish.yPos);
  fish.moveFish();
  draw_fish(SSF[0],SSF[1],fish.xPos,fish.yPos);
}


var firstFish = new Fish(2);
var secondFish = new Fish(2);
firstFish.xPos = 100;
firstFish.yPos = 100;
secondFish.xPos = 200;
secondFish.yPos = 200;
firstFish.nextX = 101;
firstFish.nextY = 101;
secondFish.nextX = 201;
secondFish.nextY = 201;
var fishArr = {0 : firstFish, 1 : secondFish};
var firstTimer = setInterval(function(){swim(0);}, 100);
var secondTimer = setInterval(function(){swim(1);}, 100);
//var fish = setInterval(swim, 100);
var stop = setInterval(stopAllTimes, 1000);

full_canvas()
//var myVar = setInterval(moveFish, 1000);


function stopAllTimes(){
  clearInterval(firstTimer);
  clearInterval(secondTimer);
}
