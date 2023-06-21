class Cloud extends MovableObjekt{
    y = 10;
    width = 510;
    height = 310;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
    }
}