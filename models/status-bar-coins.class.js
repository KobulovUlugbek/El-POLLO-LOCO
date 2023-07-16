class StatusBarCoin extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png"
  ];

  setCoins = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 45;
    this.width = 250;
    this.height = 70;
    this.setPercentage(0);
  }

  setPercentage(setCoins) {
    this.setCoins = setCoins;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.setCoins == 8) {
      return 5;
    } else if (this.setCoins >= 6) {
      return 4;
    } else if (this.setCoins >= 4) {
      return 3;
    } else if (this.setCoins >= 2) {
      return 2;
    } else if (this.setCoins == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
