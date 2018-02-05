// fire constructor push to fires array in plane fire method
function Fire(speedX, speedY, x, y, dx, dy) {
    // speed variables
    this.speedX = speedX;
    this.speedY = speedY;

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}

// draw bullets
Fire.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

// update position of bullets
Fire.prototype.update = function() {
    this.x += /*this.dx*/ this.speedX * 6.5;
    this.y += /*this.dy*/ this.speedY * 6.5;
}