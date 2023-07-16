class StatusBarBottle extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"
  ];

  setBottle = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 100;
    this.width = 250;
    this.height = 70;
    this.setPercentage(0);
  }

  setPercentage(setBottle) {
    this.setBottle = setBottle;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.setBottle == 8) {
      return 5;
    } else if (this.setBottle >= 6) {
      return 4;
    } else if (this.setBottle >= 4) {
      return 3;
    } else if (this.setBottle >= 2) {
      return 2;
    } else if (this.setBottle == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
