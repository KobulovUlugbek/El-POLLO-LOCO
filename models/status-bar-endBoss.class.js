/**
 * Klasse für die Darstellung des Endboss-Lebensstatus in der Statusleiste.
 * Erbt von der Klasse "DrawableObject".
 */
class EndBossStatus extends DrawableObject {
  /**
   * Anzahl der Lebenspunkte des Endbosses.
   * @type {number}
   */
  setLife = 3;

  /**
   * Vertikale Position des Endboss-Statusbalkens.
   * @type {number}
   */
  y = -10;

  /**
   * Horizontale Position des Endboss-Statusbalkens.
   * @type {number}
   */
  x = 450;

  /**
   * Breite des Endboss-Statusbalkens.
   * @type {number}
   */
  width = 250;

  /**
   * Höhe des Endboss-Statusbalkens.
   * @type {number}
   */
  height = 70;

  /**
   * Prozentsatz des Endboss-Lebensstatus.
   * @type {number}
   */
  percentage = 100;

  /**
   * Array der Bildpfade für die verschiedenen Zustände des Endboss-Lebensstatus.
   * @type {string[]}
   */
  IMAGES_ENDBOSSLIFE = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
  ];

  /**
   * Konstruktor der EndBossStatus-Klasse.
   */
  constructor() {
    super().loadImages(this.IMAGES_ENDBOSSLIFE);
    this.img =
      this.imageCache[
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
      ];
  }

  /**
   * Setzt den Prozentsatz des Endboss-Lebensstatus.
   * @param {number} percentage - Der Prozentsatz des Endboss-Lebensstatus.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let ImagePath = this.IMAGES_ENDBOSSLIFE[this.resolveImageIndex()];
    this.img = this.imageCache[ImagePath];
  }

  /**
   * Ermittelt den Index des Bildes basierend auf dem Prozentsatz des Endboss-Lebensstatus.
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
