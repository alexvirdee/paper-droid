// set coordinates of plane, size, and load img sprite
plane = new Paperplane(35, 35, 400, 200, "../paper-droid/assets/images/paperplane.svg")

// Sprite constructor for paper airplane 
function Paperplane(width, height, xPos, yPos, image) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speedX = 0;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.fires = [];
    this.image = new Image();
    this.image.src = image;
    this.update = function() {
        ctx = myGameArea.context;
        //=========================
        // ROTATION
        //=========================
        ctx.save();
        ctx.translate(this.xPos + 20, this.yPos + 20);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image,
            this.width / -2,
            this.height / -2,
            this.width,
            this.height
        );
        ctx.restore();

        this.fires.forEach(elem => {
            elem.update();
        });
        this.fires.forEach(elem => {
            elem.draw();
        });
    }

}

// new position method for plane
Paperplane.prototype.newPos = function() {
    this.xPos += this.speedX;
    this.yPos += this.speedY;
}

// method for having the plane move to the opposite side of canvas upon leaving side
// xPos, yPos
Paperplane.prototype.checkPos = function() {
    if (plane.xPos < 0) {
        this.xPos = myGameArea.canvas.width - plane.width;
    } else if (plane.xPos >= myGameArea.canvas.width) {
        this.xPos = 0;
    } else if (plane.yPos < 0) {
        this.yPos = myGameArea.canvas.height - plane.height;
    } else if (plane.yPos > myGameArea.canvas.height) {
        this.yPos = 0;
    }

}

// plane firing 
Paperplane.prototype.fire = function() {
    var dx = /*Math.cos(this.angle)*/ 0;
    // console.log(dx);
    var dy = /*Math.sin(this.angle)*/ 0;
    // console.log(dy);
    // bullets move in direction plane is moving 
    //====================================================================================
    var f = new Fire(Math.sign(plane.speedX),
        Math.sign(plane.speedY),
        this.xPos + this.width,
        this.yPos, dx, dy
    );
    this.fires.push(f);
}