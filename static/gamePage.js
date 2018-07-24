var canvas = document.getElementById("canvas")
var context = canvas.getContext('2d')

function full_canvas(){

  let width = screen.innerWidth
  let height = screen.innerHeight

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

full_canvas()


function draw_blue_fish(){
  var img = new Image();
  img.src = 'static/imgs/blue_fish_down.png'
  img.onload = function() {
    context.drawImage(img, 10 , 50, 96, 32);
  }
}

draw_blue_fish()
