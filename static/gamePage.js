
function(){
var canvas = document.getElementById("myCanvas")


function full_canvas(){
  // let width = screen.width
  // let height = screen.height

  canvas.style.width = 300;
  canvas.style.height = 400;

  console.log(canvas.style.width);
  console.log(canvas.style.height);
}

full_canvas()

canvas.addEventListener('click', full_canvas)
}
