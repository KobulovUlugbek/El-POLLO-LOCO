class ThrowableObject extends MovableObjekt{


    constructor(x, y){
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 45;
        this.throw();
    }


    throw(){
        this.speedY = 35;
        this.applyGravity();
        setInterval(() =>{
            this.x += 10;
        }, 25);
    }
}