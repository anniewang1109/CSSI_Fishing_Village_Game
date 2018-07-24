function full_canvas(){
  var canvas = document.getElementById("canvas")
  let width = screen.innerWidth
  let height = screen.innerHeight

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

full_canvas()

var ctx = document.getElementById('canvas').getContext('2d');

function draw_fish(f,x,y){
  var img = new Image();
  img.src = 'static/imgs/blue_fish_left.png';
  img.onload = function() {
    ctx.drawImage(img,f*32,0,32,32,x,y,32,32);
  }
}

function clear_fish(x,y){
  ctx.clearRect(x,y,96,32);
}

function moveFish(){
  clear_fish(x,y);
  y += 10;
  draw_fish(f,x,y);
}

let f = 0;
function swim(){
  f = (f+1) % 3;
  clear_fish(x,y);
  y += 1;
  draw_fish(f,x,y);
}

//var myVar = setInterval(moveFish, 1000);
//var fish = setInterval(swim, 100);
//var stop = setInterval(stopAllTimes, 10000);

var img = new Image();
img.src = 'static/imgs/blue_fish_left.png';
img.onload = function() {
  ctx.drawImage(img,f*32,32,32,32,x,y,32,32);
}

function stopAllTimes(){
  clearInterval(fish);
}
