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

function draw_fish(src,frame,x,y){
  var img = new Image();
  img.src = src;
  img.onload = function() {
    ctx.drawImage(img,f*32,0,32,32,x,y,32,32);
  }
}

function clear_fish(x,y){
  ctx.clearRect(x,y,32,32);
}

// let x = 50;
// let y = 0;
// function moveFish(){
//   clear_fish(x,y);
//   y += 10;
//   draw_blue_fish(f,x,y);
// }

let f = 0;
function swim(key){
  fish = fishArr[key];
  SSF = fish.getSSF();
  // SSF[0] = src
  // SSF[1] = frame
  clear_fish(fish.xPos,fish.yPos);
  fish.moveFish();
  draw_blue_fish(SSF[0],SSF[1],fish.xPos,fish.yPos);
}

var firstTimer = setInterval(swim(firstTimer), 100);
var firstFish = Fish(2);
var secondTimer = setInterval(swim(secondTimer), 100);
var secondFish = Fish(2);
var fishArr = {firstTimer : firstFish, secondTimer : secondFish};


//var fish = setInterval(swim, 100);
//var stop = setInterval(stopAllTimes, 10000);

full_canvas()
//var myVar = setInterval(moveFish, 1000);


function stopAllTimes(){
  clearInterval(fish);
}
