var canvas = document.getElementById("canvas")

function full_canvas(){
  let width = screen.innerWidth
  let height = screen.innerHeight

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

full_canvas()

function level_one(){
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.src = 'static/imgs/Fish_Sprites/fishDOWN.png'
  img.onload = function() {
    ctx.drawImage(img,10 , 50, 96, 32);
  }
}

level_one()
