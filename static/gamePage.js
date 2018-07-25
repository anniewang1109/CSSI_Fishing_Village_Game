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



function draw_fisher(x,y){
  //let fisher_list = []
  let img = new Image();
  img.src = "/static/imgs/fisherman_left.png";
  //fisher_list.push(img);
  //for (let i = 0; len = fisher_list.length; i<len; i++ )
  img.onload = function(){
    ctx.drawImage(img,x,y,92,128);

  }//}
}

function clear_fisher_man(x,y){
  ctx.clearRect(x,y,46,128)
}

draw_fisher(0,800)

var isDragging = false

function mouseDown(event){
  let mouseX = event.clientX
  let mouseY = event.clientY
  console.log("x:" + mouseX);
  console.log("y:" + mouseX);
  // draw_fisher(mouseX, mouseY);
  isDragging = true
}

function mouseUp(event){
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  console.log("x:" + mouseX);
  console.log("y:" + mouseX);
  // draw_fisher(mouseX, mouseY);
  isDragging = false;
}


function mouseMove(event){
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  if(isDragging){
    clear_fisher_man(old_x, new_x);
    draw_fisher(mouseX, mouseY);
  }
}

let fisher = document.getElementById("fisher");
// console.log(fisher);
// fisher.addEventListener("click", function(){
//   console.log("test");
// });

fisher.addEventListener('mousedown', mousedown);

fisher.addEventListener('mouseup', mouseup);

// var isDragging = false

//
// function handleMouseUp(e){
//   mouseX = e.pageX - e.offsetX
//   mouseY = e.pageY - e.offsetY
//   // isDragging = false
// }
//
// handleMouseDown()
// handleMouseUp()
