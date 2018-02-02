// Draw
function draw() {
    var canvas = document.getElementById('doodle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 150, 300, 40, 40);
        };
        img.src = "../paper-droid/assets/images/paperplane.svg";

    }
}

draw();

// Define object 
function droid(options) {
	var that = {};
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;

}




// Score 


// Create lives 


// Create the game loop
