class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottle;
  reload = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  endBossStatus = new EndBossStatus();
  throwableObject = [];
  Intervals = [];
  allIntervals = [];
  lastThrowTime;
  endFight = false;
  audio = true;
  gameOver = false;


// this sets audio to false so it's completely muted
  changeCircle() {
    let circlesElement = document.getElementById("circles");

    if (circlesElement.classList.contains("circle-green")) {
      // Wenn die Klasse "circle-green" vorhanden ist, ändere sie zu "circle-red" und setze das Audio-Flag auf false.
      circlesElement.classList.remove("circle-green");
      circlesElement.classList.add("circle-red");
      this.audio = false;      
    } else {
      // Andernfalls ändere die Klasse zu "circle-green", setze das Audio-Flag auf true und spiele das Audio ab.
      circlesElement.classList.remove("circle-red");
      circlesElement.classList.add("circle-green");
      this.audio = true;
    }
  }


/**
 * Setzt eine wiederholende Funktion mit der angegebenen Zeit als Intervall und speichert die Intervalld-IDs.
 *
 * @param {function} fn - Die Funktion, die wiederholt aufgerufen werden soll.
 * @param {number} time - Die Zeit in Millisekunden zwischen den Aufrufen der Funktion.
 * @returns {void}
 */
setStopableInterval(fn, time) {
  let id = setInterval(fn, time);
  this.Intervals.push(id);
}

/**
 * Löscht alle zuvor gesetzten Intervalle.
 *
 * @returns {void}
 */
clearIntervals() {
  this.Intervals.forEach(clearInterval);
  this.character.clearIntervals();
}


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.lastThrowTime = new Date().getTime();
  }

 /**
 * Setzt das "world"-Attribut des Charakters auf die aktuelle Instanz dieser Klasse.
 *
 * @returns {void}
 */
setWorld() {
  this.character.world = this;
}


  run() {
    this.setStopableInterval(() => {
      this.checkCollisionsAll();
      this.deleteThrowObject();
      this.GameOver();
    }, 100);
  }

  checkCollisionsAll() {
    this.checkCollisions();
    this.checkCollectingBottle();
    this.checkCollectingCoins();
    this.checkEnemy();
    this.checkThrowObject();
    this.endBossAttack();
    this.chickenAttack();
    this.setStopableInterval(() => {
      this.collisionWithThrowableObject();
    }, 100);
  }

  /**
 * Markiert den Feind als tot, führt eine Animation aus und entfernt ihn nach einer Verzögerung.
 *
 * @param {object} enemy - Das Feindobjekt, das als tot markiert werden soll.
 * @returns {void}
 */
 enemyDead(enemy) {
  enemy.isDead = true;
  let Time = new Date().getTime() + 500;
  clearInterval(enemy.StartImageInterval);
  this.character.jump();
  let interval = setInterval(() => {
    enemy.speed = 0;
    enemy.playAnimation(enemy.IMAGES_DEAD);
    if (this.audio) {
      enemy.chicken_sound.play();
    }
    let checkDate = new Date().getTime();
    if (checkDate > Time) {
      enemy.delete = true;
      clearInterval(interval);
    }
  }, 100);
  enemy.setStopableInterval();
}


/**
 * Überprüft Kollisionen zwischen dem Charakter und den Feinden und führt entsprechende Aktionen aus.
 *
 * @returns {void}
 */
 checkEnemy() {
  this.level.enemies = this.level.enemies.filter((e) => !e.delete);
  this.level.enemies.forEach((enemy) => {
    if (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      !enemy.isDead
    ) {
      if (enemy instanceof Chicken) {
        this.enemyDead(enemy);
      } else if (enemy instanceof EndBoss || enemy instanceof Chicken) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    }
  });
}


/**
 * Lässt Hühner-Feinde einen Rush-Angriff ausführen, wenn sie sich in der Nähe des Charakters befinden und Energie haben.
 *
 * @returns {void}
 */
 chickenAttack() {
  this.level.enemies.forEach((enemy) => {
    if (enemy.x - this.character.x < 400 && enemy.energy > 0) {
      enemy.rushAttack();
    }
  });
}


/**
 * Lässt den Endgegner und andere aktivierbare Feinde angreifen, wenn bestimmte Bedingungen erfüllt sind.
 *
 * @returns {void}
 */
endBossAttack() {
  this.level.enemies.forEach((enemy) => {
    if (
      (enemy instanceof EndBoss && this.character.x >= 3000) ||
      enemy.activate
    ) {
      if (enemy.energy > 0 && !enemy.isHurt()) {
        enemy.run(this.character);
      }
      this.endFight = true;
      enemy.activate = true;
    }
  });
}


/**
 * Überprüft Kollisionen zwischen geworfenen Objekten und Feinden, führt entsprechende Aktionen aus.
 *
 * @returns {void}
 */
 collisionWithThrowableObject() {
  this.throwableObject.forEach((bottle) => {
    this.level.enemies.forEach((e) => {
      this.bottleHitsEnemy(e, bottle);
      this.bottleHitsGround(bottle);
      this.bottleHitsEndboss(e);
    });
  });
}


/**
 * Überprüft, ob eine Flasche einen Feind trifft und führt entsprechende Aktionen aus.
 *
 * @param {object} e - Das Feindobjekt, das möglicherweise von der Flasche getroffen wird.
 * @param {object} bottle - Das Flaschenobjekt, das den Feind treffen kann.
 * @returns {void}
 */
 bottleHitsEnemy(e, bottle) {
  if (e.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround()) {
    e.hit(100);
    bottle.hit(100);
    if (this.audio) {
      bottle.bottle_splash.play();
    }
  }
}


 /**
 * Überprüft, ob die Flasche den Boden berührt hat, und führt entsprechende Aktionen aus.
 *
 * @param {object} bottle - Das Flaschenobjekt, das überprüft werden soll.
 * @returns {void}
 */
 bottleHitsGround(bottle) {
  if (!bottle.isAboveGround()) {
    bottle.speedX = 0;
    if (this.audio && bottle.energy > 0) {
      bottle.bottle_splash.play();
    }
  }
}


/**
 * Aktualisiert den Status des Endgegners, wenn er von einer Flasche getroffen wird.
 *
 * @param {object} e - Das Feindobjekt, das getroffen wurde.
 * @returns {void}
 */
bottleHitsEndboss(e) {
  if (e instanceof EndBoss) {
    this.endBossStatus.setPercentage(
      e.energy / 4.5,
      this.endBossStatus.IMAGES_ENDBOSSLIFE
    );
  }
}


/**
 * Überprüft, ob der Charakter ein Objekt werfen kann und wirft es, wenn die Bedingungen erfüllt sind.
 *
 * @returns {void}
 */
 checkThrowObject() {
  let checkReloteTime = new Date().getTime();
  let bottle = new ThrowableObject(
    this.character.x + 60,
    this.character.y + 100
  );
  if (
    this.keyboard.D &&
    this.character.setBottle > 0 &&
    checkReloteTime > this.reload
  ) {
    this.reload = new Date().getTime() + 500;
    this.character.setBottle -= 1;
    this.throwableObject.push(bottle);
    this.statusBarBottle.setBottle -= 1;
    this.statusBarBottle.setPercentage(this.character.setBottle);
  }
}


 /**
 * Überprüft, ob der Charakter mit Münzen kollidiert und führt entsprechende Aktionen aus.
 *
 * @returns {void}
 */
checkCollectingCoins() {
  this.level.coins.forEach((coins) => {
    if (this.character.isColliding(coins)) {
      this.character.setCoins++;
      if (this.audio) {
        coins.coin_sound.play();
        setTimeout(() => {
          coins.coin_sound.pause();
        }, 300);
      }
      this.statusBarCoins.setPercentage(this.character.setCoins);
      this.deleteCollectableCoin(coins);
    }
  });
}


/**
 * Überprüft, ob der Charakter mit Flaschen kollidiert und führt entsprechende Aktionen aus.
 *
 * @returns {void}
 */
checkCollectingBottle() {
  this.level.bottle.forEach((bottle) => {
    if (this.character.isColliding(bottle)) {
      this.character.setBottle++;
      if (this.audio) {
        bottle.bottle_sound.play();
        setTimeout(() => {
          bottle.bottle_sound.pause();
        }, 600);
      }
      this.statusBarBottle.setPercentage(this.character.setBottle);
      this.deleteCollectableBottle(bottle);
    }
  });
}


/**
 * Überprüft Kollisionen zwischen dem Charakter und den Feinden, wenn der Charakter nicht über dem Boden ist.
 *
 * @returns {void}
 */
checkCollisions() {
  this.level.enemies.forEach((enemy) => {
    if (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround()
    ) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  });
}


 /**
 * Entfernt die angegebene Münze aus der Liste der sammelbaren Münzen im Level.
 *
 * @param {object} coin - Die Münze, die entfernt werden soll.
 * @returns {void}
 */
 deleteCollectableCoin(coin) {
  this.level.coins.splice(this.level.coins.indexOf(coin), 1);
}

/**
 * Entfernt die angegebene Flasche aus der Liste der sammelbaren Flaschen im Level.
 *
 * @param {object} bottle - Die Flasche, die entfernt werden soll.
 * @returns {void}
 */
 deleteCollectableBottle(bottle) {
  this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1);
}


/**
 * Entfernt geworfene Objekte aus der Szene, wenn bestimmte Bedingungen erfüllt sind.
 *
 * @returns {void}
 */
deleteThrowObject() {
  for (let i = 0; i < this.throwableObject.length; i++) {
    if (
      (this.throwableObject[i].energy == 0 &&
        !this.throwableObject[i].deleted) ||
      (!this.throwableObject[i].isAboveGround() &&
        !this.throwableObject[i].deleted)
    ) {
      this.throwableObject[i].deleted = true;
      setTimeout(() => {
        if (this.throwableObject[i].deleted) {
          this.throwableObject[i].clearIntervals();
          this.throwableObject.splice(i, 1);
        }
      }, 200);
    }
  }
}

/**
 * Führt Überprüfungen durch, um das Spiel zu beenden, wenn der Charakter oder der Endgegner tot ist.
 *
 * @returns {void}
 */
 GameOver() {
  this.IfCharacterIsDead();
  this.IfEndBossIsDead();
}

/**
 * Überprüft, ob der Endgegner tot ist, und beendet das Spiel entsprechend.
 *
 * @returns {void}
 */
 IfEndBossIsDead() {
  this.level.enemies.forEach((enemy) => {
    if (
      enemy instanceof EndBoss &&
      enemy.energy <= 0 &&
      !this.gameOver &&
      !this.character.energy == 0
    ) {
      setTimeout(() => {
        this.gameOver = true;
        document.getElementById("gameOver").classList.remove("d-none");
        this.character.walking_sound.pause();
        this.clearIntervals();
      }, 500);
    }
  });
}

/**
 * Überprüft, ob der Charakter tot ist, und beendet das Spiel entsprechend.
 *
 * @returns {void}
 */
 IfCharacterIsDead() {
  if (this.character.energy <= 0 && !this.gameOver) {
    setTimeout(() => {
      this.gameOver = true;
      document.getElementById("lost").classList.remove("d-none");
      this.character.walking_sound.pause();
      this.clearIntervals();
    }, 500);
  }
}


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    if (this.endFight) {
      this.addToMap(this.endBossStatus);
    }
    this.ctx.translate(this.camera_x, 0);

    if (!this.gameOver) {
      this.addObjectsToMap(this.level.clouds);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottle);
      this.addObjectsToMap(this.level.enemies);
    }
    this.addObjectsToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0);

    //Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
/**
 * Fügt Objekte zur Karte hinzu.
 *
 * @param {Array} objects - Die Liste der Objekte, die zur Karte hinzugefügt werden sollen.
 * @returns {void}
 */
 addObjectsToMap(objects) {
  objects.forEach((o) => {
    this.addToMap(o);
  });
}

/**
 * Fügt ein Objekt zur Karte hinzu und zeichnet es.
 *
 * @param {Object} mo - Das Objekt, das zur Karte hinzugefügt werden soll.
 * @returns {void}
 */
 addToMap(mo) {
  if (mo.otherDirection) {
    this.flipImage(mo);
  }
  mo.draw(this.ctx);

  mo.drawFrame(this.ctx);

  if (mo.otherDirection) {
    this.flipImageBack(mo);
  }
}

/**
 * Dreht das Bild eines Objekts horizontal um.
 *
 * @param {Object} mo - Das Objekt, dessen Bild gedreht werden soll.
 * @returns {void}
 */
 flipImage(mo) {
  this.ctx.save();
  this.ctx.translate(mo.width, 0);
  this.ctx.scale(-1, 1);
  mo.x = mo.x * -1;
}

/**
 * Dreht das Bild eines Objekts wieder zurück.
 *
 * @param {Object} mo - Das Objekt, dessen Bild zurückgedreht werden soll.
 * @returns {void}
 */
 flipImageBack(mo) {
  mo.x = mo.x * -1;
  this.ctx.restore();
}

}
