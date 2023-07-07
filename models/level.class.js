class Level{
    enemies;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 3500;

    constructor(coins, enemies, clouds, backgroundObjects){
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}