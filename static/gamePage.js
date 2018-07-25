var ctx = document.getElementById('game-layer').getContext('2d');
var fish_width = 32;
var fish_height = 32;


function full_canvas(){
  var canvas = document.getElementById("game-layer")
  let width = screen.innerWidth
  let height = screen.innerHeight
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  nickname = document.getElementById('hidden').innerHTML
  console.log(nickname)
  ctx.font = "14px";
  ctx.fillText(nickname,0,15);
}

function draw_fish(fish){
  fish.moveFish()
  ctx.drawImage(fish.images[fish.direction],fish.currentFrame * 32, 32, 32, 32, fish.xPos, fish.yPos, 32, 32);
}

function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

function swim(fish_key){
  fish = fishArr[fish_key];
  clear_fish(fish.xPos,fish.yPos);
  draw_fish(fish);
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
firstFish.speed = 100;
var fishArr = {0 : firstFish, 1 : secondFish};
var firstTimer = setInterval(function(){swim(0);}, firstFish.speed);
var secondTimer = setInterval(function(){swim(1);}, secondFish.speed);
//var fish = setInterval(swim, 100);
var stop = setInterval(stopAllTimes, 10000);

full_canvas()
//var myVar = setInterval(moveFish, 1000);


function stopAllTimes(){
  clearInterval(firstTimer);
  clearInterval(secondTimer);
}

function draw_fisher(){
  var img = new Image();
  img.src = "/static/imgs/singlewatertile.gif";
  img.onload = function(){
    ctx.drawImage(img,0,440,50,50);
  }
}

draw_fisher()


// function duplicate_fisher(){
//   fisher = document.getElementById('fisher')
//   fisher.addEventListenter('mousedown', ()=> {
//     draw_fisher()
//   })
//   fisher.addEventListenter('mouseup', ()=> {
//     draw_fisher()
//   })
//
// }

function handleMouseDown()
