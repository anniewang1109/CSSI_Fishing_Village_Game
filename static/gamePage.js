var canvas = document.getElementById("myCanvas")

function full_canvas(){
  let width = screen.availWidth
  let height = screen.availHeight

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

full_canvas()
