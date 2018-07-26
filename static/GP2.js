var ctxF = document.getElementById('game-layerF').getContext('2d');
var fisherCanvas = document.getElementById('game-layerF');
var ctxR = document.getElementById('game-layerR').getContext('2d');
var ctxB = document.getElementById('game-layerB').getContext('2d');
var ctxY = document.getElementById('game-layerY').getContext('2d');
var utx = document.getElementById('game-layerU').getContext('2d');
var background = document.getElementById('background-layer');
var fishArr = [];
var fisherArr = [];
var level = "";
var currentFishIndex = 0;
var currentFisherIndex = 0;
var currentLevel = 0;
var fishCount = 0;
var wait;
var newFisher;
var score = 0;
var population = 10;
var availableFishers = 2;
var done = true;
var isDone;
var levelNum = 0;
var rect = fisherCanvas.getBoundingClientRect(); // abs. size of element
var scaleX = fisherCanvas.width / rect.width;    // relationship bitmap vs. element for X
var scaleY = fisherCanvas.height / rect.height;

// function full_canvas(){
//   var canvas = document.getElementById("game-layerF")
//   let width = screen.innerWidth
//   let height = screen.innerHeight
//   canvas.style.width = width + "px";
//   canvas.style.height = height + "px";
// }

// document.querySelector("#nickname").

function draw_fish(fish){
  clear_fish(fish);
  fish.moveFish()
  switch(fish.level){
    case 1:
      ctxR.drawImage(fish.images[fish.direction],fish.currentFrame * 32, 32, 32, 32, fish.xPos, fish.yPos, 32, 32);
      break;
    case 2:
      ctxB.drawImage(fish.images[fish.direction],fish.currentFrame * 32, 32, 32, 32, fish.xPos, fish.yPos, 32, 32);
      break;
    case 3:
      ctxY.drawImage(fish.images[fish.direction],fish.currentFrame * 32, 32, 32, 32, fish.xPos, fish.yPos, 32, 32);
      break;
  }
}

function draw_fisher(fisher,UorC){
  if(UorC){
    clear_fisher()
    utx.drawImage(fisher.images[fisher.direction],0,0,46,128,fisher.xPos,fisher.yPos,46,128);
  }else{
    clear_fisher(fisher);
    ctxF.drawImage(fisher.images[fisher.direction],fisher.currentFrame,0,46,128,fisher.xPos,fisher.yPos,46,128);
    ctxF.beginPath();
    ctxF.arc(fisher.catchX ,fisher.catchY ,fisher.range,0,2*Math.PI);
    ctxF.stroke();
  }
}


function clear_fish(fish){
  switch (fish.level) {
    case 1:
      ctxR.clearRect(fish.xPos,fish.yPos,32,32);
      break;
    case 2:
      ctxB.clearRect(fish.xPos,fish.yPos,32,32);
      break;
    case 3:
      ctxY.clearRect(fish.xPos,fish.yPos,32,32);
      break;
  }
}

function clear_fisher(fisher){
  try{
    ctxF.clearRect(fisher.xPos, fisher.yPos, 46, 128);
  }catch(error){
    utx.clearRect(0,0,1440,900);
  }
}

function swim(fish_index){
  if(fishArr[fish_index] != null){
    fish = fishArr[fish_index][0];
    if(fish != null){
      if(fish.state < 9){
        draw_fish(fish);
      }else{
        if(fish.state == 9){
          score += fish.level;
        }
        refreshPage();
        clearInterval(fishArr[fish_index][1]);
        clear_fish(fish);
        fishArr[fish_index][0] = null;
      }
    }
  }
}

function catch_fish(fisher_index){
    if(fisherArr.length>0){
      if(fisherArr[fisher_index][0].currentFrame == 46){
        fisher.currentFrame = 0;
        draw_fisher(fisher,false);
      }
      fisher = fisherArr[fisher_index][0];
      for(var i = 0; i<fishArr.length; i++){
          if(fishArr[i][0] != null){
            //console.log(getRadius(fishArr[i][0],fisher));
            if(getRadius(fishArr[i][0],fisher) < fisher.range){
              utx.beginPath();
              utx.moveTo(fisher.catchX, fisher.catchY);
              utx.lineTo(fishArr[i][0].catchX, fishArr[i][0].catchY);
              utx.stroke();
              //console.log(absSlope(fishArr[i][0],fisher));

                if(absSlope(fishArr[i][0],fisher) >= (window.innerHeight)/(window.innerWidth)){
                    if(fish.catchY > fisher.catchY){
                        fisher.direction = 0;
                    }else{
                        fisher.direction = 2;
                    }
                }else{
                    if(fish.catchX > fisher.catchX){
                        fisher.direction = 1;
                    }else{
                        fisher.direction = 3;
                    }
                }
                if(Math.random()*100<5){
                  fishArr[i][0].setCaught();
                }
                fisher.currentFrame = 46;
                draw_fisher(fisher,false);
                break;
            }
          }
      }
    }
}

function getRadius(fish, fisher){
  return Math.pow(Math.pow(fisher.catchX - fish.catchX,2) + Math.pow(fisher.catchY - fish.catchY,2),.5);
}

function absSlope(fish, fisher){
  return Math.abs((fish.yPos - fisher.catchY)/(fish.xPos - fisher.catchX));
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
    }else{
      isDone = setInterval(levelComplete, 10000);
    }
}

function make_fish(level, i){
  newFish = new Fish(level);
  newTimer = setInterval(function(){swim(i);}, newFish.timeSetting);
  fishArr.push([newFish,newTimer]);
}

function make_fisher(fisher,i){
  newTimer = setInterval(()=>{catch_fish(i);}, 500);
  fisherArr.push([fisher,newTimer]);
}


function drag(e){
  newFisher.updateXY(((e.clientX - rect.left) * scaleX) - 23, ((e.clientY - rect.top) * scaleY) - 64);
  clear_fisher();
  draw_fisher(newFisher, true);
}

function mouseUp(e){
  //only do this if not in river
  clear_fisher();
  draw_fisher(newFisher,0, false);
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", mouseUp);
  make_fisher(newFisher, currentFisherIndex++);
  availableFishers--;
  refreshPage();
}

function refreshPage(){
  document.getElementById("scoreTag").innerHTML = "Score = " + score + "<br>Population = " + population + "<br>Avaliable Fishers = " + availableFishers;
}

function levelComplete(){
  done = true;
  for(var i = 0; i<fishArr.length; i++){
    if(fishArr[i][0] != null){
      done = false;
      break;
    }
  }
  if(done){
    fishArr = [];
    fishCount = 0;
    clearInterval(isDone);
    console.log("Level is over");
  }
}

document.addEventListener("mousedown", function(e){
  if((e.pageX>0 && e.pageX <46) &&(e.pageY>740 && e.pageY<825)){
    if(availableFishers > 0){
      newFisher = new Fisher(e.pageX,e.pageY);
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", mouseUp);
    }
  }
  if((e.screenX>340 && e.screenX <400) &&(e.screenY>810 && e.screenY<890)){
    console.log("button clicked");
    if(done == true){
      if (levelNum <  levels.length) {
          done = false;
          level = levels[levelNum++];
          console.log("Level has started " + levelNum);
          done = false;
          readLevel();
      }
    }
  }
});

var levels = []
function getLevel(){
  levels = document.getElementById('levelData').innerHTML.split("_");
  console.log(levels);
}

console.log((window.innerHeight)/(window.innerWidth));
background.backgroundSize = window.innerWidth + "px " + window.innerHeight + "px;";

ctxF.fillRect(0,800,46,128);
ctxF.fillRect(500,800,92,92);
//full_canvas();
getLevel();
level = levels[0];
console.log("Level has started");
done = false;
readLevel();
