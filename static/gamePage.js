

function full_canvas(){
  var canvas = document.getElementById("canvas")
  let width = screen.innerWidth
  let height = screen.innerHeight

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

full_canvas()

var ctx = document.getElementById('canvas').getContext('2d');

function draw_blue_fish(){
  var img = new Image();
  img.src = 'static/imgs/blue_fish_down.png'
  img.onload = function() {
    ctx.drawImage(img,10 , 50, 96, 32);
  }
}

draw_blue_fish()

function disappear_blue_fish(){

}
