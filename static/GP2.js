var ctx = document.getElementById('game-layer').getContext('2d');
var fish_width = 32;
var fish_height = 32;

function full_canvas(){
  var canvas = document.getElementById("game-layer")
  let width = screen.innerWidth
  let height = screen.innerHeight
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

function draw_fish(fish){
  fish.moveFish()
  ctx.drawImage(fish.images[fish.direction],fish.currentFrame * 32, 32, 32, 32, fish.xPos, fish.yPos, 32, 32);
}

function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

function swim(fish_key){
  fish = fishArr[fish_key][0];
  clear_fish(fish.xPos,fish.yPos);
  draw_fish(fish);
}

var fishArr = {}
for(let i = 0; i<3; i++){
  newFish = new Fish(2);
  var newTimer = setInterval(function(){swim(i);}, newFish.speed);
  fishArr[i] = [newFish,newTimer];
}

var stop = setInterval(stopAllTimes, 10000);

full_canvas()
//var myVar = setInterval(moveFish, 1000);


function stopAllTimes(){
  for(let i = 0; i<3; i++){
    clearInterval(fishArr[i][1]);
  }
}
