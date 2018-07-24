var canvas = document.getElementById("canvas")

function full_canvas(){
  let width = screen.innerWidth
  let height = screen.innerHeight

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

full_canvas()

function blue_fish(){
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.src = 'static/imgs/blue_fish_down.png'
  img.onload = function() {
    ctx.drawImage(img,10 , 50, 96, 32);
  }
}

 blue_fish()
