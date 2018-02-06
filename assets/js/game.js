// Alex Virdee 2018 IRONHACK PROJECT

// Draw gameArea object
// Set the canvas dimensions 
// start, clear, and stop functions
var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(
            this.canvas,
            document.body.childNodes[2] // set position of canvas in relation to childNode
        );
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

// ***** GAME COMPONENT ******
function Score(width, height, color, xPos, yPos) {
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.yPos = yPos;
    this.update = function() {
        ctx = myGameArea.context;
        // if (this.type == "text") {
        //     ctx.font = this.width + " " + this.height;
        //     ctx.fillStyle = color;
        //     ctx.fillText(this.text, this.xPos, this.yPos);
        // } else {
        //     ctx.fillStyle = color;
        //     ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        // }
        ctx.font = "25px Vector_Battle";
        ctx.fillText("SCORE: " + myGameArea.frameNo, myGameArea.canvas.width - 150, 40);
    }
}

// **** SCORE *****
var myScore = 0;
myScore = new Score("20px", "Vector_Battle", "black", 700, 350, "text");


// ***** GAME OVER TEXT *****
function gameOverDisplay() {
	ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = "rgba(13, 6, 6, 1)";
    ctx.font = "bold 60px Vector_Battle";
    ctx.fillText("GAME OVER", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
}

// set coordinates of plane, size, and load img sprite
plane = new Paperplane(35, 35, 400, 200, "../paper-droid/assets/images/paperplane.svg");

// Sprite constructor for paper airplane 
function Paperplane(width, height, xPos, yPos, image, points) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speedX = 0;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.points = points;
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
    this.collide = function(target) {
        // collision detection based on coordinates of plane & targets
        var left = this.xPos;
        var right = this.xPos + (this.width);
        var top = this.yPos;
        var bottom = this.yPos + (this.height);
        var targetLeft = target.xPos;
        var targetRight = target.xPos;
        var targetTop = target.yPos;
        var targetBottom = target.yPos;
        var crash = true;
        if ((bottom < targetTop) ||
            (top > targetBottom) ||
            (right < targetLeft) ||
            (left > targetRight)) {
            crash = false;
        }

        return crash;
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


// ***** PAPER TARGETS *****
target = new Target(120, 150, 100, 150, "../paper-droid/assets/images/method-draw-image.svg");
target2 = new Target(120, 150, 100, 150, "../paper-droid/assets/images/method-draw-image.svg");
target3 = new Target(120, 150, 100, 150, "../paper-droid/assets/images/method-draw-image.svg");
target4 = new Target(120, 150, 100, 150, "../paper-droid/assets/images/method-draw-image.svg");
target5 = new Target(120, 150, 100, 150, "../paper-droid/assets/images/method-draw-image.svg");
var targets = new Array();

// target object constructor 
function Target(width, height, xPos, yPos, image) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;
    this.xPos = Math.floor(Math.random() * 600);
    this.yPos = Math.floor(Math.random() * 200);

    this.image = new Image();
    this.image.src = image;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.xPos + 10, this.yPos + 10);
        ctx.rotate(this.angle += 0.02);
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


// Move
// keyCodes: Right => 39, left => 37, Up => 38, Back => 40, Spacebar => 32
// keydown function that will move plane sprite across game canvas
function move(e) {
    // alert(e.keyCode);
    if (e.which == 39) {
        plane.speedX = 5;
        plane.angle += Math.PI / 2;
        console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {
        plane.speedX = -5;
        plane.angle -= Math.PI / 2;
        console.log("Move 5 pixels to the left")
    }
    if (e.which == 38) {
        plane.speedY = -5;
        plane.angle = 0;
        console.log("Move 5 pixels up")
    }
    if (e.which == 40) {
        plane.speedY = 5;
        plane.angle = -180;
        console.log("Move 5 pixels down")
    }
    // fire bullet when spacebar is pressed
    if (e.which == 32) {
        plane.fire();
        console.log("Shooting");
    }

}

document.onkeydown = move;


// event listener for slowing down paper airplane sprite when user keysup
window.addEventListener("keyup", function(e) {
    if (e.which == 39) {
        plane.speedX === 5 ? plane.speedX = 1 : false;
        // console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {
        plane.speedX === -5 ? plane.speedX = -1 : false;
        // console.log("Move 5 pixels to the left")
    }
    if (e.which == 38) {
        plane.speedY === -5 ? plane.speedY = -1 : false;
        // console.log("Move 5 pixels up")
    }
    if (e.which == 40) {
        plane.speedY === 5 ? plane.speedY = 1 : false;
        // console.log("Move 5 pixels down")
    }
});


function updateGameArea() {
    if (plane.collide(target) ||
    	 plane.collide(target2) ||
    	 plane.collide(target3) ||
    	 plane.collide(target4) ||
    	 plane.collide(target5)
    	) {
        gameOverDisplay();
        myGameArea.stop();
        // document.location.reload();
        // alert("You crashed!");
    } else {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        plane.checkPos();
        myScore.update();
        plane.newPos();
        plane.update();
        target.update();
        target2.update();
        target3.update();
        target4.update();
        target5.update();
        target.xPos += 0.5;
        target2.xPos += 0.5;
        target3.xPos += 0.5;
        target4.xPos += 0.5;
        target5.xPos += 0.5;
    }
}