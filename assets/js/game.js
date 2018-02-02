// Draw
var myGameArea = {
	canvas : document.createElement('canvas'),
	start: function() {
		this.canvas.width = 800;
		this.canvas.height = 400;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(
			this.canvas,
			document.body.childNodes[2]
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
plane = new Paperplane(40, 40, 0, 0, "../paper-droid/assets/images/paperplane.svg") 



function Paperplane(width, height, xPos, yPos, image) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speedX = 0;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.update = function() {
    // 	 var img = new Image();
    // 	img.onload = function() {
    //     ctx.drawImage(img, xPos, yPos, width, height);
    // };
    	// image.src = "../paper-droid/assets/images/paperplane.svg";
    	ctx = myGameArea.context;
    	ctx.drawImage(this.image, 
    		this.xPos, 
    		this.yPos,
    		this.width, this.height);
    }  

}


Paperplane.prototype.newPos = function() {
	this.xPos += this.speedX;
	this.yPos += this.speedY;
}



// Move
// keyCodes: Right => 39, left => 37, Up => 38, Back => 40, Spacebar => 32
function move(e) {
    // alert(e.keyCode);
    if (e.which == 39) {
        plane.speedX += 5;
        console.log("Move 5 pixels to the right")
    }
    if (e.which == 37) {
        plane.speedX -= 5;
        console.log("Move 5 pixels to the left")
    }
    if (e.which == 38) {
        plane.speedY -= 5;
        console.log("Move 5 pixels up")
    }
    if (e.which == 40) {
        plane.speedY += 5;
        console.log("Move 5 pixels down")
    }    

}

document.onkeydown = move;



function updateGameArea() {
	myGameArea.clear();
	plane.newPos();
	plane.update();
}



