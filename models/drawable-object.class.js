class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 215;
  height = 220;
  width = 110;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

    /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ....]
   */
    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof EndBoss ||
      this instanceof ThrowableObject
/*       this instanceof Coin
 */    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
