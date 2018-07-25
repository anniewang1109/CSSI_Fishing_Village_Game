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

function draw_fisher(src,x,y){
  newFisher = new Image();
  newFisher.src = src;
  newFisher.onload = function(){
    utx.drawImage(newFisher,0,0,46,128,x,y,46,128);
  }
  console.log(newFisher);
}

function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

function clear_fisher(x,y){
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

function catch_fish(fisher_index){
    fisher = fisherArr[fisher_index];
    for(var i = 0; i<fishArr.length; i++){
        if(Math.pow(Math.pow(fisher.xPos - fishArr[i].xPos,2) + Math.pow(fisher.yPos - fishArr[i].yPos,2),.5) < 50){
            console.log("Fish Caught");
        }
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
          make_fish(1,fishCount);
          catch_fish(0);
          break;
        case "2":
          make_fish(2,fishCount);
          break;
        case "3":
          make_fish(3,fishCount);
          break;
      }
      fishCount++;
      currentIndex++;
      wait = setInterval(readLevel, 1000);
    }
}

function make_fish(level, i){
  newFish = new Fish(level);
  newTimer = setInterval(function(){swim(i);}, newFish.speed);
  fishArr.push([newFish,newTimer]);
}

function make_fisher(x,y,i){
  newFisher = new Fisher(x,y);
  newTimer = setInterval(function(){catch_fish(i);}, 50);
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
//make_fisher(500,500,0);
draw_fisher("static/imgs/fisherman_right.png",100,500);

level = levels.split("_")[0];
readLevel();
