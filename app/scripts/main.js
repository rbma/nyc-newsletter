'use strict';

/*global ga:false, requestAnimationFrame:false */


// -------------------------------------------------
//
// Canvas setup
// 
// -------------------------------------------------

var canvas, ctx, animate;

var fallingDrops = [];

var images = ['images/mail.png', 'images/hand.png', 'images/note2.png', 'images/note1.png'];

var width = window.innerWidth;
var height = window.innerHeight;

var drawBg = function(){
	ctx.clearRect(0,0,width,height);
};

var canvasMethods = {
	fallingDrops: [],
	noOfDrops: 5,

	x: 0,
	y: 0,

	imgWidth: 50,
	imgHeight: 40,

	width: window.innerWidth,
	height: window.innerHeight,

	reset: function(){
		var self = this;

		drawBg();
		self.width = window.innerWidth;
		self.height = window.innerHeight;

		canvas.width = self.width;
		canvas.height = self.height;


	},

	draw: function(){

		drawBg();


		for (var i = 0; i < fallingDrops.length; i++){

			ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y, fallingDrops[i].image.width, fallingDrops[i].image.height);
			fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed


			if (fallingDrops[i].y > height + 500){  //Repeat the raindrop when it falls out of view
				fallingDrops[i].y = -55; //Account for the image size
				fallingDrops[i].x = Math.random() * width;    //Make it appear randomly along the width    
			}
		}

		animate = requestAnimationFrame(canvasMethods.draw);
	},

	setup: function(){
      var self = this;

      canvas = document.createElement('canvas');

      

      self.width = window.innerWidth;
      self.height = window.innerHeight;
      
      canvas.width = self.width;
      canvas.height = self.height;
      canvas.style.opacity = 1;
      canvas.style.zIndex = 1;

      document.body.appendChild(canvas);

      if (canvas.getContext){

        ctx = canvas.getContext('2d');

        for (var i = 0; i < self.noOfDrops; i++){
          var fallingDr = {};

          fallingDr.image = new Image();
          fallingDr.image.src = images[Math.floor(Math.random() * images.length)];
          fallingDr.image.height = self.imgHeight;
          fallingDr.image.width = self.imgWidth;

          fallingDr.x = Math.random() * canvas.width;
          // ------------------------------------------------
          // Make sure they are above the page
          //
          
          fallingDr.y = Math.random() * -500 - 250;
          fallingDr.speed = 3 + Math.random() * 2;
          fallingDrops.push(fallingDr);
        }

        canvasMethods.draw();
      }

    }
};

window.addEventListener('resize', canvasMethods.reset, false);



// -------------------------------------------------
//
// Track signups
// 
// -------------------------------------------------

$('#subscribe').on('click', function(){
	ga('send', 'event', 'button', 'click', 'Subscribe');
});

setTimeout(function(){
	canvasMethods.setup();
},1000);
