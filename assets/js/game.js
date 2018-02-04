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

// Set size of plane, coordinates, and load img sprite
plane = new Paperplane(35, 35, 400, 200, "../paper-droid/assets/images/paperplane.svg")

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
		//=========================
		//this is the rotation code
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
			//======================
			//======================
		//==========================
		//I added these forEach loops instead of the for loops
		this.fires.forEach(elem => {
			elem.update();
		}); 
    	this.fires.forEach(elem => {
			elem.draw();
		}); 	
	} 

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
	//=======================================================
	//removed fire for loop and put it in the update function
	//=======================================================

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


Paperplane.prototype.fire = function() {
	//========================================
	//I didnt get this so I commented it out :/
	//========================================
	var dx = /*Math.cos(this.angle)*/0;
	console.log(dx);
	var dy = /*Math.sin(this.angle)*/0;
	console.log(dy);
	//====================================================================================
	//Added speeds arguments so that the bullets move in the direction the plane is moving
	//====================================================================================
	var f = new Fire(Math.sign(plane.speedX), Math.sign(plane.speedY), this.xPos + this.width, this.yPos, dx, dy);

	this.fires.push(f);
}


function Fire(speedX, speedY, x, y, dx, dy) {
	//===================
	//Added speed vars
	//===================
	this.speedX = speedX;
	this.speedY = speedY;
	//===================
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;

// rotate plane sprite method add to event listener for left and right key press
Paperplane.prototype.drawRotated = function(context, xPos, yPos) {
    ctx.save();
    ctx.translate(this.xPos + this.width / 2, this.yPos + this.height / 2);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();

}

// plane method that will add to fires array for bullets 
Paperplane.prototype.fire = function() {
    var dx = Math.cos(this.angle);
    var dy = Math.sin(this.angle);


Fire.prototype.update = function() {
	//============================================================================
	//You could just multiply when you pass in the speed arguments instead of here
	//Ex:new Fire(Math.sign(airplane.speedX) * 65, etc...)
	//============================================================================
	this.x += /*this.dx*/this.speedX * 6.5;
	this.y += /*this.dy*/this.speedY * 6.5;	

    var f = new Fire(this.x, this.y, dx, dy);

    this.fires.push(f);
}

// Fire bullets constructor
function Fire(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}


// Drawing bullets 
Fire.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

}

// update trajectory of bullets
Fire.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy
}


// Move
// keyCodes: Right => 39, left => 37, Up => 38, Back => 40, Spacebar => 32
// keydown function that will move plane sprite across game canvas
function move(e) {
	// alert(e.keyCode);
	//=======================================================================================================
	//Im not sure how you want the rotation to work, 
	//but you would need some conditionals to make sure it doesnt spin forever when you input movement
	//probably would need a keyup setting angle to 0
	//=======================================================================================================
    if (e.which == 39) {
		plane.speedX = 5;
		//====================
		//rotation use example
		//====================
		//plane.angle += Math.PI / 2
		//====================
        // console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {

		plane.speedX = -5;
		

        plane.speedX = -5;
        plane.drawRotated();

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
    if (e.which == 32) {
        plane.fire(); // fire bullet when spacebar is pressed
    }

}

document.onkeydown = move;


// event listener for slowing down paper airplane sprite when user keysup
window.addEventListener("keyup", function(e) {

	  if (e.which == 39) {
        plane.speedX === 5 ? plane.speedX = 1 : false;

    if (e.which == 39) {
        plane.speedX = 1;

        // console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {
        plane.speedX === -5 ? plane.speedX = -1: false;
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
// calls js game functions
function updateGameArea() {

	myGameArea.clear();
	plane.checkPos();
	plane.newPos();
	plane.update();
}

//==============================================================================
//BTW putting the fires array inside plane obj and updating it there too was genius!
//Ill probably use that in my game, thanks for the idea!
//==============================================================================




    myGameArea.clear();
    plane.checkPos();
    plane.newPos();
    plane.update();
}

