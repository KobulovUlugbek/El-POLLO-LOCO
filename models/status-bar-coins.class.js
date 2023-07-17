/**
 * Klasse für die Darstellung des Münzenstatus in der Statusleiste.
 * Erbt von der Klasse "DrawableObject".
 */
class StatusBarCoin extends DrawableObject {
  /**
   * Array der Bildpfade für die verschiedenen Zustände des Münzenstatus.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png"
  ];

  /**
   * Anzahl der gesammelten Münzen.
   * @type {number}
   */
  setCoins = 0;

  /**
   * Konstruktor der StatusBarCoin-Klasse.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 45;
    this.width = 250;
    this.height = 70;
    this.setPercentage(0);
  }

  /**
   * Setzt den Prozentsatz des Münzenstatus.
   * @param {number} setCoins - Die Anzahl der gesammelten Münzen.
   */
  setPercentage(setCoins) {
    this.setCoins = setCoins;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Ermittelt den Index des Bildes basierend auf der Anzahl der gesammelten Münzen.
   * @returns {number} - Der Index des Bildes.
   */
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
