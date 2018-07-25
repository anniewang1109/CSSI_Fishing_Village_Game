var ctx = document.getElementById('game-layer').getContext('2d');
var utx = document.getElementById('ui-layer').getContext('2d');
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

function draw_farmer(src,x,y){
  newFarmer = new Image();
  newFarmer.src = src;
  utx.drawImage(newFarmer,x,y,46,128);
}

function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

function clear_farmer(x,y){
  utx.clearRect(0,0,1440,900);
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

function catchFish(fisher_index){
    fisher = fisherArr[fisher_index];
    for each(fish in fishArr){
      if(Math.pow())
    }
}

var fishArr = [];
var fisherArr = [];
var level = "";
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

function makeFisherman(level, i){
  var newTimer = setInterval(function(){catchFish(i);}, 50);
  fisherArr.push([newFisher,newTimer]);
}

// dragFarmer = false;
// document.addEventListener("click", function(e){
//   console.log(e.clientX + "  :  " +  e.clientY);
//   if((e.clientX>0 && e.clientX <46) &&(e.clientY>800 && e.clientY<912)){
//     //clicked on the famer = true
//     dragFarmer = true;
//     console.log(dragFarmer);
//     document.addEventListener("mousemove", function(e){
//       clear_farmer(e.pageX,  e.pageY);
//       draw_farmer("static/imgs/fisherman_right.png", e.pageX, e.pageY);
//     });
//   }
//   //document.getElementById("demo").innerHTML = e.clientX + " : " + e.clientY;
// });

var levels = []
function getLevel(){
  levels = document.getElementById('levelData').innerHTML;//.split("_");
}

full_canvas()
getLevel();

level = levels.split("_")[0];
readLevel();
