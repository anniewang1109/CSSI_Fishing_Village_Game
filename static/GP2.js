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
var population = 30;
var availableFishers = 5;
var done = true;
var isDone;
var levelNum = 0;
var rect = fisherCanvas.getBoundingClientRect(); // abs. size of element
var scaleX = fisherCanvas.width / rect.width;    // relationship bitmap vs. element for X
var scaleY = fisherCanvas.height / rect.height;
var stopFishing = false;
var fishRatio = 1;
var levels = "";
var lastLevelScore = 0;
var fishersX = "";
var fishersY = "";

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
    // ctxF.beginPath();
    // ctxF.arc(fisher.catchX ,fisher.catchY ,fisher.range,0,2*Math.PI);
    // ctxF.stroke();
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
    if(stopFishing == false){
        if(fisherArr.length>0){
          if(fisherArr[fisher_index][0].currentFrame == 46){
            fisher.currentFrame = 0;
            draw_fisher(fisher,false);
          }
          fisher = fisherArr[fisher_index][0];
          fisher.minDistance = fisher.range;
          fisher.closestFishIndex =  -1;
          for(var i = 0; i<fishArr.length; i++){
              if(fishArr[i][0] != null){
                if(getRadius(fishArr[i][0],fisher) < fisher.minDistance){
                    fisher.minDistance = getRadius(fishArr[i][0],fisher);
                    fisher.closestFishIndex =  i;
                }
              }
          }
          // utx.beginPath();
          // utx.moveTo(fisher.catchX, fisher.catchY);
          // utx.lineTo(fishArr[i][0].catchX, fishArr[i][0].catchY);
          // utx.stroke();
          //console.log(absSlope(fishArr[i][0],fisher));
          if(fisher.closestFishIndex != -1){
            if(absSlope(fishArr[fisher.closestFishIndex][0],fisher) >= (window.innerHeight)/(window.innerWidth)){
                if(fishArr[fisher.closestFishIndex][0].catchY > fisher.catchY){
                    fisher.direction = 0;
                }else{
                    fisher.direction = 2;
                }
            }else{
                if(fishArr[fisher.closestFishIndex][0].catchX > fisher.catchX){
                    fisher.direction = 1;
                }else{
                    fisher.direction = 3;
                }
            }
            if(Math.random()*100<((100-getRadius(fishArr[fisher.closestFishIndex][0],fisher))/2)){ ///ASK DAD ABOUT THIS
              fishArr[fisher.closestFishIndex][0].setCaught();
            }
            fisher.currentFrame = 46;
            draw_fisher(fisher,false);
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
      isDone = setInterval(levelComplete, 2000);
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
  document.getElementById("scoreTag").innerHTML = "Score: " + score;
  document.getElementById("populationTag").innerHTML = "Village Population: " + population;
  document.getElementById("availableFishersTag").innerHTML = "Avaliable Fishers: " + availableFishers;
  document.getElementById("currentLevel").innerHTML = "Level" + levelNum;
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
    currentFishIndex = 0;
    console.log("step 1");
    updateSettings();
    console.log("step 2");
    lastLevelScore += score;
    clearInterval(isDone);
    //passToAppEngine();
  }
}

document.addEventListener("mousedown", function(e){
    localX = ((e.clientX - rect.left) * scaleX);
    localY = ((e.clientY - rect.top) * scaleY);
    //console.log(localX + " - " + localY);
    if((localX > 230 && localX < 270) && (localY > 750 && localY < 800)){
        if(availableFishers > 0){ // fisherman
          newFisher = new Fisher(e.pageX,e.pageY);
          document.addEventListener("mousemove", drag);
          document.addEventListener("mouseup", mouseUp);
        }
    }
    if((localX > 265 && localX < 440) && (localY > 835 && localY < 890)){
        stopFishing = true; //stop fishing
    }
    if((localX > 40 && localX < 215) && (localY > 835 && localY < 890)){
      if(done == true){   //start level
          if (levelNum++ < 10) {
              done = false;
              createLevel();
              console.log("Level " + levelNum);
              stopFishing = false;
              readLevel();
          }
      }
  }
});

function passToAppEngine(){
    const url = '/game?GameUser.fisherX=' + fisherX + '&GameUser.fisherY=' + fisherY + '&GameUser.levels' + levels;
    const options = {
      method: 'POST',
      credentials: 'same-origin',
    };
    const request = new Request(url, options);
    fetch(request);
}

function createLevel(){
    for(var i = 0; i<population*fishRatio*1.5; i+=((fishMade*2) - 1)){
      waitTime = "|".repeat(Math.floor((Math.random() * 3) + 2));
      fishMade = Math.floor((Math.random() * 3) + 1);
      fishMade2 = fishMade - 1;
      if(fishMade2 == 0){
        fishMade2 = "|";
      }
      level += fishMade + "" +  fishMade2 + waitTime;
    }
    levels = levels + "_" + level;
    console.log(level);
}

function updateSettings(){
    score -= lastLevelScore;
    fishRatio = fishRatio * (population/score);
    if((fishRatio == 0)||(population = 0)){
        document.getElementById('winOrLose').value = "Lost";
        document.getElementById('endGame').submit();
    }

    if(score - population < 0){
        for(var i = 0; i<Math.floor((score - population)/6); i++){
            clear_fisher(fisherArr[fisherArr.length-1][0]);
            fisherArr.pop();
        }
        availableFishers += Math.floor((score - population)/6);
        if(availableFishers < 0){
          availableFishers = 0;
        }
        population += (score - population) + 10;
    }else if(score - population > 0){
        availableFishers += Math.floor((score - population)/6) + 1;
        population += (score - population) + 10; //surplus of fish AND 10 extra
    }else{
        population += 10;
        availableFishers += 1;
    }
    refreshPage();
    score += lastLevelScore;
}

// var scoreBoard = new Image();
// scoreBoard.src = "/static/imgs/Board.png";
// scoreBoard.onload = function () {
//    ctxF.drawImage(scoreBoard, 0,screen.height - 175,325,175)
// }

refreshPage();
