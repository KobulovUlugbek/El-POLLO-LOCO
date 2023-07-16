class Bottle extends MovableObjekt {
  height = 100;
  width = 100;
  x = 250;
  y = 200;

  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10
  };

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
  ];

  bottle_sound = new Audio("audio/bottle.mp3");

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 250 + Math.random() * 3000;
    this.y = 340 - Math.random();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 160);
  }
}
