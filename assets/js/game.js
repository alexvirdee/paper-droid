// Draw the canvas 
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



// Score 


// Create lives 


// Create the game loop