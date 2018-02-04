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

Paperplane.prototype.fire = function() {
    var dx = /*Math.cos(this.angle)*/ 0;
    // console.log(dx);
    var dy = /*Math.sin(this.angle)*/ 0;
    // console.log(dy);
    // bullets move in direction plane is moving 
    //====================================================================================
    var f = new Fire (Math.sign(plane.speedX), 
    				  Math.sign(plane.speedY), 
    				  this.xPos + this.width, 
    				  this.yPos, dx, dy
    				  );
    this.fires.push(f);
}


function Fire(speedX, speedY, x, y, dx, dy) {
    // speed variables
    this.speedX = speedX;
    this.speedY = speedY;

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}

Fire.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

Fire.prototype.update = function() {
    this.x += /*this.dx*/ this.speedX * 6.5;
    this.y += /*this.dy*/ this.speedY * 6.5;
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


// function that starts up upon html loading
function updateGameArea() {
    myGameArea.clear();
    plane.checkPos();
    plane.newPos();
    plane.update();
}