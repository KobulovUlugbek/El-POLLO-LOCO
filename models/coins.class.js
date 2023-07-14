class Coin extends MovableObjekt{
    height = 100;
    width = 100;
    x = 250;
    y = 300;

    IMAGES_COINS = [ 
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    coin_sound = new Audio('audio/coin.mp3');
    
    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 250  + Math.random() * 3000;
        this.y = 350 - Math.random() * 200;
        this.animate();

    }

    animate(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_COINS);
        }, 160 )
    }
}