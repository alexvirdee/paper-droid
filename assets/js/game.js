// Alex Virdee 2018 IRONHACK PROJECT PAPER-DROID 

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

// ***** SCORE COMPONENT ******
function Score(width, height, color, xPos, yPos) {
    this.width = width;
    this.height = height;
    this.score = 0;
    this.xPos = xPos;
    this.yPos = yPos;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.font = "25px Vector_Battle";
        ctx.fillText("SCORE: " + this.score, myGameArea.canvas.width - 160, 40);
      
    }
}

// **** SCORE *****
myScore = new Score("20px", "Vector_Battle", "black", 700, 350, "text");

// ***** LIVES COMPONENT ******
function Lives(width, height, color, xPos, yPos, plane) {
    this.width = width;
    this.height = height;
    this.lives = 3;
    this.xPos = xPos;
    this.yPos = yPos;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.font = "25px Vector_Battle";
        ctx.fillText("LIVES: " + this.lives, myGameArea.canvas.width - 780, 40);
    }
}

lives = new Lives("20px", "Vector_Battle", "black", 700, 350, "text");

// ***** GAME OVER TEXT *****
function gameOverDisplay() {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = "rgba(13, 6, 6, 1)";
    ctx.font = "bold 60px Vector_Battle";
    ctx.fillText("GAME OVER ", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
}

// set coordinates of plane, size, and load img sprite
plane = new Paperplane(35, 35, 400, 200, "../paper-droid/assets/images/paperplane.svg");

// Sprite constructor for paper airplane 
function Paperplane(width, height, xPos, yPos, image, points) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speedX = 0;
    this.speedY = 0;
    this.lives = 3;
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
        var targetRight = target.xPos + (this.width);
        var targetTop = target.yPos;
        var targetBottom = target.yPos + (this.height);
        var collided = true;
        if ((bottom < targetTop) ||
            (top > targetBottom) ||
            (right < targetLeft) ||
            (left > targetRight)) {
            collided = false;
        }
        return collided;
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
    var dx = Math.cos(plane.angle) /*0*/;
    // console.log(dx);
    var dy = Math.sin(plane.angle) /*0*/;
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
function Fire(speedX, speedY, xPos, yPos, dx, dy) {
    // speed variables
    this.speedX = speedX;
    this.speedY = speedY;
    this.width = 1;
    this.height = 1;

    this.xPos = xPos;
    this.yPos = yPos;
    this.dx = dx;
    this.dy = dy;
}

// draw bullets
Fire.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(this.xPos, this.yPos, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

// update position of bullets
Fire.prototype.update = function() {
    this.xPos +=  this.speedX * 12;
    this.yPos +=  this.speedY * 12;
}

// ***** PAPER TARGETS *****
var targets = new Array();

// every 2 seconds push a target into targets array
function makePaperballs() {
    if (everyInterval(2000) && targets.length < 25) {
        targets.push(new Target(120, 150, "../paper-droid/assets/images/crumpled-paper.svg"));
    } else if (everyInterval(2000) && targets.length < 25 && myScore.score >= 100) {
    	targets.push(new Target(120, 150, "../paper-droid/assets/images/crumpled-paper.svg"));
    	targets.push(new Target(160, 200, "../paper-droid/assets/images/crumpled-paper.svg"))
    } else if (everyInterval(800) && targets.length < 25 && myScore.score >= 200) {
    	targets.push(new Target(120, 150, "../paper-droid/assets/images/crumpled-paper.svg"));
    } 
}

function drawPaperballs() {
    // loop through targets array
    targets.forEach(function(e) {
        // loop through fires array in paperplane object constructor
        plane.fires.forEach(function(e2) {
            e.collide(e2);
        });
        e.update();
    });
    // filter destoryed paper targets
    var results = targets.filter(function(elem) {
        return elem.destroyed === false;
    });
    targets = results;
}

// interval for game area 
var everyInterval = ((n) => {
    if ((myGameArea.frameNo / n) % 1 === 0) {
        return true;
    } else {
        return false;
    }
});

// target object constructor 
function Target(width, height, image) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;
    this.destroyed = false;
    this.xPos = Math.floor(Math.random() * 600);
    this.yPos = Math.floor(Math.random() * 200);

    this.image = new Image();
    this.image.src = image;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.xPos + 20, this.yPos + 20);
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
    this.collide = function(target) {
        // collision detection based on coordinates of plane bullets & targets
        var left = this.xPos;
        var right = this.xPos + (this.width);
        var top = this.yPos;
        var bottom = this.yPos + (this.height);
        var targetLeft = target.xPos;
        var targetRight = target.xPos + (target.width);
        var targetTop = target.yPos;
        var targetBottom = target.yPos + (target.height);
        var hit = true;
        if ((bottom < targetTop) ||
            (top > targetBottom) ||
            (right < targetLeft) ||
            (left > targetRight)) {
            hit = false;
            console.log("MISSED");
            // console.log(hit);

        } else if(left < targetLeft + targetRight && left + right > targetLeft && top < targetTop + targetBottom && top + bottom > targetTop) {
        	myScore.score += 10;
            // bullet is hitting target 
            this.destroyed = true;
            console.log("HIT!");
            // console.log(hit);
        }
        // return crash;
    }
}

// Move
// keyCodes: Right => 39, left => 37, Up => 38, Back => 40, Spacebar => 32
// keydown function that will move plane sprite across game canvas
function move(e) {
    // alert(e.keyCode);
    if (e.which == 39) {
        plane.speedX = 5;
        plane.angle += Math.PI / 3;
        console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {
        plane.speedX = -5;
        plane.angle -= Math.PI / 3;
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

function startOver(e) {
	if (e.which == 13) {
    	document.location.reload(); 
    }
}

function updateGameArea() {
    for (var i = 0; i < targets.length; i++) {
        if (plane.collide(targets[i])) {
            console.log("collided");
            lives.lives -= 1;
            plane.xPos = myGameArea.canvas.width/2;
            plane.yPos = myGameArea.canvas.height/2;
        }    
    }
    myGameArea.clear();
    myGameArea.frameNo += 20;
    plane.checkPos();
    myScore.update();
    lives.update();
    plane.newPos();
    plane.update();
    makePaperballs();
    drawPaperballs(); 

    if (lives.lives === 0) {
    	myScore.score = 0;
    	gameOverDisplay();
    	myGameArea.stop();
    	document.onkeydown = startOver;
    } 
}