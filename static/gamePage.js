var ctx = document.getElementById('game-layer').getContext('2d'); //all permanet objects
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

function draw_fisher(src,x,y,UorC){
  newFisher = new Image();
  newFisher.src = src;
  newFisher.onload = function(){
    if(UorC){
      utx.drawImage(newFisher,0,0,46,128,x,y,46,128);
    }else{
      ctx.drawImage(newFisher,0,0,46,128,x,y,46,128);
    }
  }
  console.log(newFisher);
}

function draw_button(src,x,y,width,height){
  newButton = new Image();
  newButton.src = src;
  newButton.onload = ctx.drawImage()
}

draw_button(0,872,46,26);
draw_fisher("static/imgs/fisher_right.png",0 ,0, false);

function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

function clear_fisher(x,y){
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
          //console.log("Fisher: " + fisher.xPos + " - " + fisher.yPos + " | " + "Fish: "+ fishArr[i][0].xPos + " - " + fishArr[i][0].yPos);
          if(Math.pow(Math.pow(fisher.xPos - fishArr[i][0].xPos,2) + Math.pow(fisher.yPos - fishArr[i][0].yPos,2),.5) < 50){
              fishArr[i][0].setCaught();
              break;
          }
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
  newTimer = setInterval(function(){swim(i);}, newFish.timeSetting);
  fishArr.push([newFish,newTimer]);
}

function make_fisher(x,y,i){
  newFisher = new Fisher(x,y);
  newTimer = setInterval(function(){catch_fish(i);}, 1000);
  fisherArr.push([newFisher,newTimer]);
  console.log(fisherArr.length);
}

dragFisher = false;

function drag(e){
  clear_fisher(e.pageX,e.pageY);
  draw_fisher("static/imgs/fisher_right.png", e.pageX, e.pageY, true);
  console.log("drag");
}

function mouseUp(e){
  //only do this if not in river
  draw_fisher("static/imgs/fisher_right.png",e.pageX, e.pageY, false);
  dragFisher = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", mouseUp);
}

document.addEventListener("mousedown", function(e){
  if((e.clientX>0 && e.clientX <46) &&(e.clientY>800 && e.clientY<912)){
    dragFisher = true;
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
make_fisher(200,500,0);
//draw_fisher("static/imgs/fisherman_right.png",200,500);

level = levels.split("_")[0];
readLevel();
