class Fisher{
  constructor(x,y){
    this.catchX = x + 23;
    this.catchY = y + 64;
    this.xPos = x;
    this.yPos = y;
    this.direction = 0;
    this.currentFrame = 0;
    this.range = 150;
    this.images = [];
    for(let i = 0; i<4; i++){
      this.images.push(new Image());
      this.images[i].src = "/static/imgs/" + this.getSS(i) + ".png";
    }
  }

  getSS(imageDirection){
    return ["fisher_front", "fisher_right", "fisher_back", "fisher_left"][imageDirection];
  }

  updateXY(x,y){
    this.xPos = x;
    this.yPos = y;
    this.catchX = x + 23;
    this.catchY = y + 64;
  }
}
