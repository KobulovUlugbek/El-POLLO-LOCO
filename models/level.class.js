class Level{
    coins;
    bottle;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 3500;

    constructor(coins, bottle, enemies, clouds, backgroundObjects){
        this.coins = coins;
        this.bottle = bottle;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}