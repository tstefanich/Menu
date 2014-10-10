/** TJS **/
var xPos;
var yPos;
/** TJS END **/

var sprite_cursor_circle, sprite_cursor_arrow_up, sprite_cursor_arrow_down;

var canon = {

    onWindowReady: false,

    //animation and frames
    animationFrames: null,
    numFrames: 0,
    imgsLoaded: 0,
    frameCount: 0,
    imagesReady: false,
    frameDirection: 1, //1 = forward, -1 = backward
    paused: false,
    stopped: false,
    pauseTime: 1000, // pause time between animation loops in ms

    //html elements
    imgViewPort: document.getElementById('theFrame'),
    clicks: document.getElementsByClassName('counts'),
    topCount: document.getElementById('top-count'),
    bottomCount: document.getElementById('bottom-count'),

    //animation play totals
    totalTop: 0,
    totalBottom: 0,

    //sound
    sounds: [ "pastpresent0.aiff", 'pastpresent1a.aiff', 'pastpresent2a.aiff',
        'pastpresent3a.aiff', 'pastpresent4a.aiff', 'speeduplife.aiff', 'moment.mp3' ],
    numSoundsLoaded: 0,
    soundsReady: false,
    currLoopingSound: "",

    //draw vars
    fps: 30,
    now: 0,
    then: 0,
    delta: 0,
    interval: 1000 / 30,

    animations: {
        background: [],
        number: [],
        spirals: []
    },

    imgPaths: ['img/background.png', 'img/numbers.png', 'img/spirals-new.png'],
    imgEls: [],

    canvas: document.getElementById('mainCanvas'),
    ctx: document.getElementById('mainCanvas').getContext('2d'),
    canvasWidth: 0,
    canvasHeight: 0,

    //check to see if counters are at reset position
    reset: true,

    //canvas hitareas
    clickareas :[

        //blackboard top area
        {
            x : 190, y: 145, width: 400, height: 290,
            handler: function(){
                canon.handleHitAreaClick(-1);
            }
        },

        //torso area
        {
            x : 275, y: 460, width: 250, height: 420,
            handler: function(){
                canon.handleHitAreaClick(1);
            }
        },

        //top number
        {
            x : 360, y: 0, width: 50, height:100,
            handler: function(){
                canon.resetCounters();
            }
        },

        //bottom number
        {
            x : 360, y: 924, width: 50, height: 100,
            handler: function(){
                canon.resetCounters();
            }
        }
    ],

    /**** TJS ***/
    mouseAlpha: 1,
    mouseFadeCounter: 0,
    mouse: function (xPos, yPos) {
//        this.ctx.save();
//        this.ctx.globalAlpha = this.mouseAlpha;
//        var sprite_cursor;
//        if (yPos - 40 > 512 && yPos - 40 > 89) {
//            sprite_cursor = sprite_cursor_arrow_up;
//        } else if (yPos - 40 < 512 && yPos - 40 < 924) {
//            sprite_cursor = sprite_cursor_arrow_down;
//        }
//
//        if (yPos - 40 >= 925 || yPos - 40 <= 90) {
//            sprite_cursor = sprite_cursor_circle;
//        }
//        if(sprite_cursor)
//            this.ctx.drawImage(sprite_cursor, xPos - 20, yPos - 70);
//        this.ctx.restore();
//        if (this.mouseFadeCounter >= 60) {
//            this.mouseAlpha = Math.max(0, ((60 - this.mouseFadeCounter) / 10) + 1);
//
//        }
//        this.mouseFadeCounter++;


    },
    /**** TJS END *****/
    setup: function () {
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.loadAnimationFrames();
        this.setupSounds();
        this.background();

        //canon numbers

        /** TJS **/
        sprite_cursor_circle = new Image();
        sprite_cursor_circle.src = "img/cursor-circle.png";

        sprite_cursor_arrow_up = new Image();
        sprite_cursor_arrow_up.src = "img/cursor-arrow-up.gif";

        sprite_cursor_arrow_down = new Image();
        sprite_cursor_arrow_down.src = "img/cursor-arrow-down.gif";
        /** TJS END **/
    },

    loadAnimationFrames: function () {
        this.numFrames = this.animations.spirals.length;
        for (var i = 0; i < canon.imgPaths.length; i++) {
            var img = new Image();
            img.onload = function () {
                canon.onImageLoaded.call(canon);
            };
            img.src = canon.imgPaths[i];
            this.imgEls.push(img);
        }
    },

    onImageLoaded: function () {
        this.imgsLoaded++;
        if (this.imgsLoaded == this.imgPaths.length) {
            this.imagesReady = true;
            this.checkForDrawReadiness();
        }
    },

    setupSounds: function () {
        window.soundManager.setup({
            url: './swf/',
            flashVersion: 9,
            useFlashBlock: true,
            useHighPerformance: true,
            flashLoadTimeout: 1000,
            useHTML5Audio: true,
            waitForWindowLoad: false,
            debugMode: false,

            onready: function () {
                var i;

                for (i = 0; i < canon.sounds.length; i++) {
                    var preload = soundManager.createSound({
                        id: canon.sounds[i],
                        url: './audio/' + canon.sounds[i],
                        type: 'audio/aiff',
                        onload: function () {
                            console.log('sounds load');
                            canon.numSoundsLoaded++;
                            if (canon.numSoundsLoaded == canon.sounds.length) {
                                canon.soundsReady = true;
                                canon.checkForDrawReadiness();
                            }
                        }
                    });

                    preload.load();
                }
            }
        });

    },

    checkForDrawReadiness: function () {
        if (this.imagesReady && this.soundsReady && this.onWindowReady) {
            console.log('ready to draw');
            this.initListeners();
            this.numFrames = this.animations.spirals.length;
            this.then = Date.now();
            this.draw();
        }
    },

    initListeners: function () {
        /** TJS **/
        window.onmousemove = function (evt) {
            canon.mouseFadeCounter = 0;
            canon.mouseAlpha = 1;
            xPos = evt.pageX;
            yPos = evt.pageY;
            canon.mouse(xPos, yPos);
        };
        /** TJS END **/
        this.canvas.onclick = function(evt){
            for(var i = 0; i < canon.clickareas.length; i++){
                var ca = canon.clickareas[i];
                if(evt.pageX >= ca.x && evt.pageX <= ca.x + ca.width){
                    if(evt.pageY >= ca.y && evt.pageY <= ca.y + ca.height){
                        ca.handler.call(canon);
                    }
                }
            }
        };
    },

    handleHitAreaClick: function (dir) {
        console.log('hit area click');
        this.frameDirection = dir;
        this.stopped = false;

        if (this.frameDirection > 0) {
            if (this.totalBottom == 0 && this.totalTop == 0) {
                soundManager.play(this.sounds[5]);
            }
        } else {
            if (this.totalTop == 0 && this.totalBottom == 0) {
                //if going backwards and both top and bottom are at 0 reset frame count backwards
                this.frameCount = this.numFrames - 1;
            }
            this.determineLoopingSound();
        }
    },

    incrementCounters: function (number, counter) {
        if (counter == "top") {
            if (this.totalTop >= 10)return;
            this.totalTop += number;
        } else if (counter == 'bottom') {
            if (this.totalBottom >= 10) return;
            this.totalBottom += number;
        }
    },

    resetCounters: function () {
        this.totalTop = 0;
        this.totalBottom = 0;
        this.stopped = true;
        this.frameCount = 0;
        this.background();
        this.goToFrame(0);
        soundManager.stopAll();
        soundManager.play(this.sounds[6]);

    },

    //the draw loop
    background: function () {
        //console.log('yep');
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.drawImage(this.imgEls[0], 90, 130);
    },

    numbers : function(){

        var animTop = canon.animations.number[this.totalTop];
        var animBottom = canon.animations.number[this.totalBottom];
        //drawing the top number
        this.ctx.drawImage(this.imgEls[1], animTop[0], animTop[1], animTop[2], animTop[3], (this.canvas.width/2 - (animTop[2] /2)), 5, animTop[2], animTop[3]);
        //drawing the bottom number
        this.ctx.drawImage(this.imgEls[1], animBottom[0], animBottom[1], animBottom[2], animBottom[3], (this.canvas.width/2 - (animBottom[2] /2)), this.canvas.height - (animBottom[3] + 5), animBottom[2], animBottom[3]);
    },

    draw: function () {

        requestAnimationFrame(function () {
            canon.draw.call(canon);
        });

        if (this.stopped) {
            console.log('stopped: ', this.stopped);
            return;
        }
        if (this.reset) this.reset = false; // no longer in a reset mode cuz a frame has been drawn

        this.now = Date.now();

        if (this.paused) {
            if ((Date.now() - this.then) <= this.pauseTime) {
                this.goToFrame(0);

                return;
            }
            else {
                this.paused = false;
            }
        }

        this.delta = this.now - this.then;
        if (this.delta > this.interval) {
            this.then = this.now - (this.delta % this.interval);
            // ... Code for Drawing the Frame ...
            /** TJS **/
            canon.background();
            /** TJS END **/
            this.goToFrame(this.frameCount);

            this.frameCount += this.frameDirection;

            if (this.frameDirection < 0) {

                if (this.frameCount <= 0) {
                    this.frameCount = this.numFrames - 1;
                    this.paused = true;

                    if (this.totalBottom > 0) this.incrementCounters(-1, 'bottom');
                    else this.incrementCounters(1, 'top');

                    this.determineLoopingSound();

                }

            } else {

                if (this.frameCount >= this.numFrames) {
                    this.frameCount = 0;
                    this.paused = true;

                    if (this.totalTop > 0) this.incrementCounters(-1, 'top');
                    else this.incrementCounters(1, 'bottom');

                    this.determineLoopingSound();

                }

            }
            /** TJS **/
            canon.mouse(xPos, yPos);
            /** TJS END **/

            canon.numbers();
        }

    },

    goToFrame: function (frame) {

        var frameSizeWidth = animations_data.frames[this.frameCount].frame.w;
        var frameSizeHeight = animations_data.frames[this.frameCount].frame.h;
        var framePosX = animations_data.frames[this.frameCount].frame.x;
        var framePosY = animations_data.frames[this.frameCount].frame.y;
        var canvasDrawX = animations_data.frames[this.frameCount].spriteSourceSize.x + 20;
        var canvasDrawY = animations_data.frames[this.frameCount].spriteSourceSize.y + -20;
        this.ctx.drawImage(this.imgEls[2], framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);

    },

    determineLoopingSound: function () {

        var sound, totalValue, numLoops = -1;

        totalValue = Math.max(0, this.totalTop, this.totalBottom);

        switch (totalValue) {
            case 0:
            case 1:
            case 2:
            case 3:
                //play song for first part
                sound = this.sounds[0];
                break;
            case 4:
            case 5:
                //play song for second part
                sound = this.sounds[1];
                break;
            case 6:
            case 7:
                //play song for third part:
                sound = this.sounds[2];
                break;
            case 8:
            case 9:
                //play song for 4th part
                sound = this.sounds[3];
                break;
            case 10:
                //play last song only twice
                sound = this.sounds[4];
                numLoops = 2;
                break;
            default :
                break;
        }

        //play whatever sound is set, if its not playing already
        if (sound != this.currLoopingSound) this.loopSound(sound, numLoops, 1, null);

    },

    loopSound: function (soundId, numLoops, loopStart, callBack) {
        console.log(loopStart);
        soundManager.play(soundId, {
            onfinish: function () {
                if (numLoops < 0) canon.loopSound(soundId, numLoops, loopStart);
                else {
                    if (loopStart < numLoops) {
                        loopStart++;
                        canon.loopSound(soundId, numLoops, loopStart);

                    } else {
                        if (callBack && typeof callBack == 'function') callBack.call(canon);
                    }

                }
            }
        });

        if (this.currLoopingSound != "" && this.currLoopingSound != soundId) {
            console.log('stopping sound: ', this.currLoopingSound);
            soundManager.stop(this.currLoopingSound);
        }

        this.currLoopingSound = soundId;
    }


}; // end canon object definition

// load imgPaths and sounds before window load just to get it started.
canon.setup();

//init the whole object on window load
window.onload = function go() {
    console.log('ready');
    canon.onWindowReady = true;
    canon.checkForDrawReadiness();
};





