class EndBossStatus extends DrawableObject {
  setLife = 3;
  y = -10;
  x = 450;
  width = 250;
  height = 70;
  percentage = 100;

  IMAGES_ENDBOSSLIFE = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
  ];

  constructor() {
    super().loadImages(this.IMAGES_ENDBOSSLIFE);
    this.img =
      this.imageCache[
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
      ];
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let ImagePath = this.IMAGES_ENDBOSSLIFE[this.resolveImageIndex()];
    this.img = this.imageCache[ImagePath];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
