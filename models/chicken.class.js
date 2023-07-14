class Chicken extends MovableObjekt {
  y = 380;
  width = 40;
  height = 50;
  StartImageInterval;
  isDead = false;
  delete = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
  ];

  IMAGES_DEAD=[
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  chicken_sound = new Audio('audio/chicken_small.mp3');

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 720 + Math.random() * 3500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.25 + Math.random() * 0.4;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.StartImageInterval = setInterval(() => {
          this.playAnimation(this.IMAGES_WALKING);
    }, 160);
  }
}