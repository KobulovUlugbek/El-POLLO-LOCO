class ThrowableObject extends MovableObjekt{


    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
      ];

    constructor(x, y){
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 45;
        this.throw();
        this.animate();
    }


    throw(){
        this.speedY = 35;
        this.applyGravity();
        setInterval(() =>{
            this.x += 10;
        }, 25);
    }

    animate(){
        setInterval(()=>{
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 100)
    }
}