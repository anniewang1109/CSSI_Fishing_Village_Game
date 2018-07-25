var ctx = document.getElementById('game-layer').getContext('2d');
var utx = document.getElementById('ui-layer').getContext('2d');
var fishArr = [];
var fisherArr = [];
var level = "";
var currentFishIndex = 0;
var currentFisherIndex = 0;
var currentLevel = 0;
var fishCount = 0;
var wait;

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

function draw_fisher(fisher,UorC){
  if(UorC){
    utx.drawImage(fisher.images[fisher.direction],0,0,46,128,fisher.xPos,fisher.yPos,46,128);
  }else{
    ctx.drawImage(fisher.images[fisher.direction],0,0,46,128,fisher.xPos,fisher.yPos,46,128);
    //ctx.beginPath();
    //ctx.arc(fisher.xPos,fisher.yPos,100,0,2*Math.PI);
    //ctx.stroke();
  }
}


function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

function clear_fisher(){
  utx.clearRect(0,0,1440,900);
}

function swim(fish_index){
  if(fishArr[fish_index] != null){
    fish = fishArr[fish_index][0];
    if(fish != null){
      if(fish.state != 9){
        clear_fish(fish.xPos,fish.yPos);
        draw_fish(fish);
      }else{
        clearInterval(fishArr[fish_index][1]);
        clear_fish(fish.xPos,fish.yPos);
        fishArr[fish_index][0] = null;
      }
    }
  }
}

function catch_fish(fisher_index){
    fisher = fisherArr[fisher_index][0];

    for(var i = 0; i<fishArr.length; i++){
        if(fishArr[i][0] != null){
          if(Math.pow(Math.pow(fisher.xPos - fishArr[i][0].xPos,2) + Math.pow(fisher.yPos - fishArr[i][0].yPos,2),.5) < fisher.range){
              fishArr[i][0].setCaught();
              console.log(fisher_index + " has caught a fish");
              break;
          }
        }
    }
}

function readLevel(){
    clearInterval(wait);
    if(currentFishIndex != level.length){
      switch(level.substring(currentFishIndex,currentFishIndex+1)){
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
      currentFishIndex++;
      wait = setInterval(readLevel, 1000);
    }
}

function make_fish(level, i){
  newFish = new Fish(level);
  newTimer = setInterval(function(){swim(i);}, newFish.timeSetting);
  fishArr.push([newFish,newTimer]);
}

function make_fisher(fisher,i){
  newTimer = setInterval(function(){catch_fish(i);}, 1000);
  fisherArr.push([fisher,newTimer]);
}

function drag(e){
  newFisher.xPos = e.pageX;
  newFisher.yPos = e.pageY;
  clear_fisher();
  draw_fisher(newFisher, true);
}

var newFisher;
function mouseUp(e){
  //only do this if not in river
  draw_fisher(newFisher,0, false);
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", mouseUp);
  make_fisher(newFisher, currentFisherIndex++);
}

document.addEventListener("mousedown", function(e){
  newFisher = new Fisher(e.pageX,e.pageY);
  if((e.clientX>0 && e.clientX <46) &&(e.clientY>800 && e.clientY<912)){
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", mouseUp);
  };
});

var levels = []
function getLevel(){
  levels = document.getElementById('levelData').innerHTML;//.split("_");
}

full_canvas()
getLevel();
console.log(levels.split("_"));
level = levels.split("_")[0];
readLevel();
