class MovableObjekt extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  character;
  lastHit = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 50,
    right: 0
}


  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 215;
    }
  }

/*   isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  } */

  isColliding (mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height -this.offset.bottom > mo.y &&
        this.x + this.offset.bottom < mo.x + mo.width - mo.offset.right &&
        this.y +this.offset.top < mo.y + mo.height - mo.offset.bottom;
}


  hit(){
    this.energy -= 1;
    if(this.energy < 0){
      this.energy = 0;
    }else{
      this.lastHit = new Date().getTime();
    }
  }

  isDead (){
    return this.energy == 0;
  }

  isHurt(){
    let timepassed = new Date().getTime() -this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }


  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }
}