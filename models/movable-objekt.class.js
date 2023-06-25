class MovableObjekt {
  x = 120;
  y = 215;
  img;
  height = 220;
  width = 110;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;



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

  moveRight() {
    console.log("Moving right");
  }

  moveLeft(){
    setInterval(()=>{
        this.x -= this.speed;
    }, 1000 / 60);
}
}