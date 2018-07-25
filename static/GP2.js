var ctx = document.getElementById('game-layer').getContext('2d');

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

function swim(fish_index){
  fish = fishArr[fish_index][0];
  if(fish.state != 9){
    clear_fish(fish.xPos,fish.yPos);
    draw_fish(fish);
  }else{
    clearInterval(fishArr[fish_index][1]);
    clear_fish(fish.xPos,fish.yPos);
  }
}

var fishArr = [];
var level = ""
var currentIndex = 0;
var currentLevel = 0;
var fishCount = 0;
var wait;
function readLevel(){
    clearInterval(wait);
    if(currentIndex != level.length){
      switch(level.substring(currentIndex,currentIndex+1)){
        case "|":
          fishCount--;
          break;
        case "1":
          makeFish(1,fishCount);
          break;
        case "2":
          makeFish(2,fishCount);
          break;
        case "3":
          makeFish(3,fishCount);
          break;
      }
      fishCount++;
      currentIndex++;
      wait = setInterval(readLevel, 1000);
    }
}
function makeFish(level, i){
  newFish = new Fish(level);
  var newTimer = setInterval(function(){swim(i);}, newFish.speed);
  fishArr.push([newFish,newTimer]);
}
// document.addEventListener("click", function(e){
//      document.getElementById("demo").innerHTML = e.clientX + " : " + e.clientY;
// });
var levels = []
function getLevel(){
  levels = document.getElementById('levelData').innerHTML;//.split("_");
}

full_canvas()
getLevel();

level = levels.split("_")[0];
readLevel();
