// ***** PAPER TARGETS *****
target = new Target(80, 100, 100, 150, "../paper-droid/assets/images/method-draw-image.svg");
var targets = [];
// enemy object constructor 
function Target(width, height, xPos, yPos, image) {

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;
    this.xPos = xPos;
    this.yPos = yPos;

    this.image = new Image();
    this.image.src = image;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.xPos + 10, this.yPos + 10);
        ctx.rotate(this.angle += 0.05);
        ctx.drawImage(
            this.image,
            this.width / -2,
            this.height / -2,
            this.width,
            this.height
        );
        ctx.restore();
    }
}