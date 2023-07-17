/**
 * Klasse für die Darstellung der Statusleiste.
 * Erbt von der Klasse "DrawableObject".
 */
class StatusBar extends DrawableObject {
  /**
   * Array der Bildpfade für die verschiedenen Zustände der Statusleiste.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
  ];

  /**
   * Prozentsatz des Statusbalkens.
   * @type {number}
   */
  percentage = 100;

  /**
   * Konstruktor der StatusBar-Klasse.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = -10;
    this.width = 250;
    this.height = 70;
    this.setPercentage(100);
  }

  /**
   * Setzt den Prozentsatz des Statusbalkens.
   * @param {number} percentage - Der Prozentsatz des Statusbalkens.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Ermittelt den Index des Bildes basierend auf dem Prozentsatz des Statusbalkens.
   * @returns {number} - Der Index des Bildes.
   */
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
