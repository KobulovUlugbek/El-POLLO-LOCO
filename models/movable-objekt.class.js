/**
 * Basisklasse für bewegliche Objekte im Spiel.
 * Erbt von der Klasse "DrawableObject".
 */
class MovableObjekt extends DrawableObject {
  /**
   * Geschwindigkeit des Objekts.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Gibt an, ob das Objekt in die andere Richtung bewegt wird.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Vertikale Geschwindigkeit des Objekts.
   * @type {number}
   */
  speedY = 0;

  /**
   * Beschleunigung des Objekts.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * Energie des Objekts.
   * @type {number}
   */
  energy = 100;

  /**
   * Zeitpunkt des letzten Treffers.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Anzahl der gesammelten Münzen.
   * @type {number}
   */
  setCoins = 0;

  /**
   * Anzahl der gesammelten Flaschen.
   * @type {number}
   */
  setBottle = 0;

  /**
   * Array der Intervall-IDs für StopableIntervals.
   * @type {number[]}
   */
  Intervals = [];

  /**
   * Gibt an, ob das Objekt gelöscht wurde.
   * @type {boolean}
   */
  deleted = false;

  /**
   * Referenz zur Welt.
   * @type {World}
   */
  world;

  /**
   * Offset des Objekts.
   * @type {Object}
   * @property {number} top - Oberer Offset-Wert.
   * @property {number} bottom - Unterer Offset-Wert.
   * @property {number} left - Linker Offset-Wert.
   * @property {number} right - Rechter Offset-Wert.
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };

  /**
   * Setzt ein StopableInterval und speichert die ID.
   * @param {Function} fn - Die Funktion, die ausgeführt werden soll.
   * @param {number} time - Das Intervall in Millisekunden.
   */
  setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.Intervals.push(id);
  }

  /**
   * Löscht alle gespeicherten Intervalle.
   */
  clearIntervals() {
    this.Intervals.forEach(clearInterval);
  }

  /**
   * Wendet die Schwerkraft auf das Objekt an.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Überprüft, ob das Objekt über dem Boden schwebt.
   * @returns {boolean} - Gibt an, ob das Objekt über dem Boden schwebt.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof Chicken) {
      return this.y < 380;
    } else {
      return this.y < 215;
    }
  }

  /**
   * Überprüft, ob das Objekt mit einem anderen Objekt kollidiert.
   * @param {MovableObjekt} mo - Das andere Objekt.
   * @returns {boolean} - Gibt an, ob das Objekt mit dem anderen Objekt kollidiert.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y &&
      this.x + this.offset.bottom < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Führt eine Trefferaktion aus.
   */
  hit() {
    let Time = new Date().getTime() + 2000;
    if (Time > this.lastHit) {
      this.energy -= 5;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

  /**
   * Überprüft, ob das Objekt tot ist.
   * @returns {boolean} - Gibt an, ob das Objekt tot ist.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Überprüft, ob das Objekt verletzt ist.
   * @returns {boolean} - Gibt an, ob das Objekt verletzt ist.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Spielt eine Animation ab.
   * @param {string[]} images - Die Pfade zu den Bildern der Animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Bewegt das Objekt nach rechts.
   * @param {number} speed - Die Geschwindigkeit der Bewegung.
   */
  moveRight(speed) {
    if (speed) {
      this.speed = speed;
    }
    this.x += this.speed;
  }

  /**
   * Bewegt das Objekt nach links.
   * @param {number} speed - Die Geschwindigkeit der Bewegung.
   */
  moveLeft(speed) {
    if (speed) {
      this.speed = speed;
    }
    this.x -= this.speed;
  }

  /**
   * Lässt das Objekt springen.
   * @param {string} low - Gibt an, ob der Sprung niedrig ist.
   */
  jump(low) {
    if (low) {
      this.speedY = 22;
    } else {
      this.speedY = 25;
    }
  }

  /**
   * Führt einen Rauschangriff aus.
   */
  rushAttack() {
    this.speed = 3;
    if (!this.isAboveGround()) {
      this.jump("low");
    }
  }
}
