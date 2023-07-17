/**
 * Klasse für ein Level im Spiel.
 */
class Level {
  /**
   * Die Münzen im Level.
   * @type {Coin[]}
   */
  coins;

  /**
   * Die Flasche im Level.
   * @type {Bottle}
   */
  bottle;

  /**
   * Die Gegner im Level.
   * @type {MovableObjekt[]}
   */
  enemies;

  /**
   * Die Wolken im Hintergrund des Levels.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * Die Hintergrundobjekte im Level.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * Die X-Koordinate des Levelendes.
   * @type {number}
   */
  level_end_x = 3500;

  /**
   * Erzeugt eine Instanz eines Levels.
   * @param {Coin[]} coins - Die Münzen im Level.
   * @param {Bottle} bottle - Die Flasche im Level.
   * @param {MovableObjekt[]} enemies - Die Gegner im Level.
   * @param {Cloud[]} clouds - Die Wolken im Hintergrund des Levels.
   * @param {BackgroundObject[]} backgroundObjects - Die Hintergrundobjekte im Level.
   */
  constructor(coins, bottle, enemies, clouds, backgroundObjects) {
    this.coins = coins;
    this.bottle = bottle;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
