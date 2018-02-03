// Draw gameArea object
// Set the canvas dimensions 
// start, clear, and stop functions
var myGameArea = {
	canvas : document.createElement('canvas'),
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
plane = new Paperplane(35, 35, 0, 0, "../paper-droid/assets/images/paperplane.svg") 


// Sprite constructor for paper airplane 
function Paperplane(width, height, xPos, yPos, image) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speedX = 0;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.angle;
    this.fires = [];
    this.image = new Image();
    this.image.src = image;
    this.update = function() {
    // 	 var img = new Image();
    // 	img.onload = function() {
    //     ctx.drawImage(img, xPos, yPos, width, height);
    // };
    	// image.src = "../paper-droid/assets/images/paperplane.svg";
    	ctx = myGameArea.context;
    	ctx.drawImage(
    		this.image, 
    		this.xPos, 
    		this.yPos,
    		this.width, 
    		this.height
    		);

    	for (var i = 0; i < this.fires.length; i++) 
    		this.fires[i].update(); 	
    }  

}

// new position method for plane
Paperplane.prototype.newPos = function() {
	this.xPos += this.speedX;
	this.yPos += this.speedY;

	for (var i = 0; i < this.fires.length; i++) 
		this.fires[i].newPos();

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


function Fire(x, y, dx, dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
}

Fire.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = "#000";
	ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

Fire.prototype.update = function() {
	this.x += this.dx;
	this.y += this.dy	
}


Paperplane.prototype.fire = function() {
	var dx = Math.cos(this.angle);
	var dy = Math.sin(this.angle);

	var f = new Fire(this.x, this.y, dx, dy);

	this.fires.push(f);
}



// Move
// keyCodes: Right => 39, left => 37, Up => 38, Back => 40, Spacebar => 32
// keydown function that will move plane sprite across game canvas
function move(e) {
    // alert(e.keyCode);
    if (e.which == 39) {
        plane.speedX = 5;
        // console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {
        plane.speedX = -5;
        // console.log("Move 5 pixels to the left")
    }
    if (e.which == 38) {
        plane.speedY = -5;
        // console.log("Move 5 pixels up")
    }
    if (e.which == 40) {
        plane.speedY = 5;
        // console.log("Move 5 pixels down")
    } 
    	// fire bullet when spacebar is pressed
    if (e.which == 32) {
    	plane.fire();
    }   

}

document.onkeydown = move;


// event listener for slowing down paper airplane sprite when user keysup
window.addEventListener("keyup", function(e) {
	  if (e.which == 39) {
        plane.speedX = 1;
        // console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {
        plane.speedX = -1;
        // console.log("Move 5 pixels to the left")
    }
    if (e.which == 38) {
        plane.speedY = -1;
        // console.log("Move 5 pixels up")
    }
    if (e.which == 40) {
        plane.speedY = 1;
        // console.log("Move 5 pixels down")
    }   
}); 




// function that starts up upon html loading
// calls js game functions
function updateGameArea() {
	myGameArea.clear();
	plane.checkPos();
	plane.newPos();
	plane.update();
}



