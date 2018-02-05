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
        this.frameNo = 60;
        this.interval = setInterval(updateGameArea, 20);
    },
    animate: function(loop) {
    	var rf = (function() {
    		return window.requestAnimationFrame || 
    			   window.webkitRequestAnimationFrame ||
    			   window.mozRequestAnimationFrame ||    			
    			   window.oRequestAnimationFrame ||
    			   window.msRequestAnimationFrame ||
    			   function(cb, el) {
    			   		window.setTimeout(cb, 1000/60);
    			   }
    	})();

    	var l = function() {
    		loop();
    		rf(l, this.canvas)
    	}
    	rf(l, this.canvas);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
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
    myGameArea.clear();
    plane.checkPos();
    plane.newPos();
    plane.update();
    target.update();
}