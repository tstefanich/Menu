/***************************/
/* Sound Component for web */
/***************************/

var steadySound; 
var steady2Sound;
var johnCageSound;

var canon11 = {
    sprite_cursor: null,
    sprite_tools: null,
    sprite_city: null,
    babyCry: null,
    sprite_tools_0: null,
    sprite_tools_1: null,
    sprite_tools_2: null,
    sprite_tools_3: null,
    sprite_tools_4: null,
    sprite_tools_5: null,
    sprite_tools_6: null,
    sprite_tools_7: null,
    sprite_tools_8: null,
    sprite_tools_9: null,

    //steadySound: null, 
    //steady2Sound: null, 
    //johnCageSound: null,

    x: 0.0,
    y: 0.0,
    easing: 0.05,


    currentPos: 0,
    scrollVal: 0,
    scrollVal2: 0,
    speed: 15,
    soundLoaded: false,
    counter: 1,
    //sounds: ['thefinal2', 'steady', 'steady2c'],
    extraSpeed: 0,


    xPos: 384,
    yPos: 512,
    canvasWidth: 768,
    canvasHeight: 1024,
    mode: 'serpant',
    isAnimating: false,


    /******************/
    /*      Draw      */
    /******************/
    fps: 30,
    now: Date.now(),
    then: Date.now(),
    interval: null,
    delta: null,

    mouseAlpha: 1,
    mouseFadeCounter: 0,
    mouse: function (xPos, yPos) {
        ctx.save();
        //ctx.globalAlpha = this.mouseAlpha;
        var targetY = yPos;
        var dy = yPos - this.y;
        if(Math.abs(dy) > 1) {
            this.y += dy * this.easing;
        }
        ctx.drawImage(this.sprite_cursor, 80, this.y - 340);
        ctx.restore();
        //if (this.mouseFadeCounter >= 60) {
            //c*(t*t*t*t*t + 1) + b
            //this.mouseAlpha = Math.max(0, ((60-this.mouseFadeCounter)/10)+1);
            //console.log(this.mouseAlpha);     
        //}
        this.mouseFadeCounter++;
    },
    frameCount: 0,
    frameNumber: 0,
    city: function () {
        if (this.scrollVal >= this.canvasWidth) {
            this.scrollVal = -25;
        }

        if (this.scrollVal <= -767) {
            this.scrollVal = -40;
        }

        if (this.xPos <= 383) {
            this.scrollVal += 2;
        } else if (this.xPos >= 383) {
            this.scrollVal -= 2;
        }

        ctx.drawImage(this.sprite_city, this.canvasWidth - this.scrollVal - 768, 890, this.scrollVal - 768, 67, 0, 0, this.scrollVal - 768, 67);
        ctx.drawImage(this.sprite_city, this.scrollVal - 768, 890, 1551, 67);
        ctx.drawImage(this.sprite_city, this.canvasWidth - this.scrollVal + 768, 890, this.scrollVal + 768, 67, 0, 0, this.scrollVal + 768, 67);
        ctx.drawImage(this.sprite_city, this.scrollVal + 768, 890, 1551, 67);
    },
    tool: 1,
    serpant: function () {
        //if (this.frameCount === 0) {
                  // soundManager.stop(sounds[1]);
            
            //soundManager.play(soundsWords[Math.floor(Math.random() * 12)]);
        //}
        this.frameCount++;
    
        switch (canon11.tool) {
        case 1:
            this.sprite_tools = this.sprite_tools_1;
            this.speed = 15;
            break;
        case 2:
            this.sprite_tools = this.sprite_tools_2;
            break;
        case 3:
            this.sprite_tools = this.sprite_tools_3;
            break;
        case 4:
            this.sprite_tools = this.sprite_tools_4;
            this.speed = 11;    
            break;
        case 5:
            this.sprite_tools = this.sprite_tools_5;
            break;
        case 6:
            this.sprite_tools = this.sprite_tools_6;
            break;
        case 7:
            this.sprite_tools = this.sprite_tools_7;
            this.speed = 4;
            break;
        case 8:
            this.sprite_tools = this.sprite_tools_8;
            break;
        case 9:
            this.sprite_tools = this.sprite_tools_9;
            break;
        }
        
        if (this.xPos <= 383) {
            this.scrollVal2 += this.speed;
            if (this.xPos <= 260) {
                this.scrollVal2 += (this.speed + 9);
                if (this.xPos <= 130) {
                    this.scrollVal2 += (this.speed + 9) * 2;
                }
            }
        } else if (this.xPos >= 383) {
            this.scrollVal2 -= this.speed;
            if (this.xPos >= 515) {
                this.scrollVal2 -= (this.speed + 9);
                if (this.xPos >= 643) {
                    this.scrollVal2 -= (this.speed + 9) * 2;
                }
            }
        }
        
        
        if (this.scrollVal2 > 0) {
            this.scrollVal2 = 580 - 7048;
        } else if (this.scrollVal2 < 580 - 7048) {
            this.scrollVal2 = 0;
        }
       
        ctx.drawImage(this.sprite_tools, this.scrollVal2 + 100, 350, 7048, 400);
        if (this.frameCount % 12 === 0) {

            if (this.tool !== 1 && this.tool !== 4 && this.tool !== 7) {
                this.tool++;
            }
            if (this.tool === 10) {
                this.tool = 1;
            }
        }
        if (this.tool >= 10) {
            this.tool = 1;
        }
    },
    setup: function() {
        whichCanon = 'canon11';
        this.mode = 'serpant';
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,   0, this.canvasWidth, this.canvasHeight);
        this.preloadImages();
        this.interval = 1000 / this.fps;
        
        draw();

        steadySound = new Howl({ urls: [getPhoneGapPath() + 'canons/canon11/audio/steady.wav'], loop: true, onload: function(){ } }); //new Audio();
        steadySound.play();
        steadySound.volume(0);
        steadySound.fadeIn(1,1200,function(){});
   


        steady2Sound = new Howl({ urls: [getPhoneGapPath() + 'canons/canon11/audio/steady2c.wav'], loop: true, onload: function(){ } }); //new Audio();
        //steady2Sound.addEventListener('ended', playNext);
       
        johnCageSound = new Howl({ urls: [getPhoneGapPath() + 'canons/canon11/audio/thefinal2.wav'], loop: true, onload: function(){ } }); //new Audio();
        johnCageSound.play();
        johnCageSound.volume(0);
        johnCageSound.fadeIn(1,1200,function(){});
    },
    preloadImages: function () {
   
        this.sprite_cursor = new Image();
        this.sprite_cursor.src = "canons/canon11/img/sun.gif";

        this.sprite_city = new Image();
        this.sprite_city.src = "canons/canon11/img/city.gif";

        this.sprite_tools_1 = new Image();
        this.sprite_tools_1.src = "canons/canon11/img/tools/_layer1.gif";

        this.sprite_tools_2 = new Image();
        this.sprite_tools_2.src = "canons/canon11/img/tools/_layer2.gif";
    
        this.sprite_tools_3 = new Image();
        this.sprite_tools_3.src = "canons/canon11/img/tools/_layer3.gif";
    
        this.sprite_tools_4 = new Image();
        this.sprite_tools_4.src = "canons/canon11/img/tools/_layer4.gif";
     
        this.sprite_tools_5 = new Image();
        this.sprite_tools_5.src = "canons/canon11/img/tools/_layer5.gif";
     
        this.sprite_tools_6 = new Image();
        this.sprite_tools_6.src = "canons/canon11/img/tools/_layer6.gif";
     
        this.sprite_tools_7 = new Image();
        this.sprite_tools_7.src = "canons/canon11/img/tools/_layer7.gif";
     
        this.sprite_tools_8 = new Image();
        this.sprite_tools_8.src = "canons/canon11/img/tools/_layer8.gif";
    
        this.sprite_tools_9 = new Image();
        this.sprite_tools_9.src = "canons/canon11/img/tools/_layer9.gif";
    },
    update: function() {
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta > this.interval) {
            //console.log('test');
            this.then = this.now - (this.delta % this.interval);
            // ... Code for Drawing the Frame ...
            switch (this.mode) {
            case 'serpant':
                //console.log('draw serpant');
                ctx.fillStyle = "#000000";
                ctx.fillRect(0,   0, this.canvasWidth, this.canvasHeight);
                this.mouse(this.xPos, this.yPos);
                this.serpant();
                this.city();
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 957, this.canvasWidth, 67);
                break;
            }
        }
    },
    reset:function(){
        this.currentPos= 0;
        this.scrollVal= 0;
        this.scrollVal2= 0;
        this.speed= 15;
        this.soundLoaded= false;
        this.counter= 1;
        //sounds: ['thefinal2', 'steady', 'steady2c'],
        this.extraSpeed= 0;


        this.xPos= 384,
        this.yPos= 512,
        this.mode= 'serpant',
        this.isAnimating= false;

        // break;
        steadySound.fadeOut(0, 250, function(){steadySound.unload();});
        steady2Sound.fadeOut(0, 250, function(){steady2Sound.unload();});
        johnCageSound.fadeOut(0, 250, function(){johnCageSound.unload();});
    
    },
    touchStart:function(event){
        //console.log('Start');
        this.xPos = event.pageX || event.touches[0].pageX;
        this.yPos = event.pageY || event.touches[0].pageY;
        this.frameCount = 0;
        this.tool++;

        if (this.tool == 4) {
            //AppMobi.context.playSound('audio/steady2c.wav');
            //engineSound.pause();
        }
        if (this.tool == 5) {
            steadySound.pause();
            steady2Sound.play(); 
        }
        if (this.tool == 8) {
            steady2Sound.pause();
            steadySound.play();
        }
    },
    touchMove:function(event){
        //console.log('MOVE');
        this.xPos = event.pageX || event.touches[0].pageX;
        this.yPos = event.pageY || event.touches[0].pageY;
        this.mouseFadeCounter = 0;
        this.mouseAlpha = 1;
    }
};
