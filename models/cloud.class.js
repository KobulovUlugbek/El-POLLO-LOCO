class Cloud extends MovableObjekt {
  y = 10;
  width = 510;
  height = 310;
  speed = 0.15;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}

