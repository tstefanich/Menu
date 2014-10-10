/** TJS END **/


/*
var Canvas = document.getElementById('myCanvas');
    var ctx = Canvas.getContext('2d');
ctx.width = 768;
ctx.height = 1024;

       function getPhoneGapPath() {
            var path = window.location.pathname;
            path = path.substr( 0, path.length - 10 );
            path = ''; // THIS WAS ADDED FOR THE RUNNING LOCALLY
            return path;
        };
*/
//Sounds
var speedUpLife, moment, sound;


var canon8 = {
    /** TJS **/
    xPos: -100,
    yPos: -100,
    speededUpLifSoundPlaying:false,
    sprite_cursor_circle:null,
    sprite_cursor_arrow_up:null,
    sprite_cursor_arrow_down:null,
    sprite_cursor:null,
    backgroundSoundPlaying: false,
    touchEnd: false,
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
   //imgViewPort: document.getElementById('theFrame'),
   //clicks: document.getElementsByClassName('counts'),
   //topCount: document.getElementById('top-count'),
   //bottomCount: document.getElementById('bottom-count'),
    
    mouseX:-100,
    mouseY:-100,
    easing:.50,
    
    //animation play totals
    totalTop: 0,
    totalBottom: 0,

    //sound
    sounds: [ "pastpresent0.wav", 'pastpresent1a.wav', 'pastpresent2a.wav',
        'pastpresent3a.wav', 'pastpresent4a.wav'],
    sounds2: [ "pastpresent0.wav", 'pastpresent1b.wav', 'pastpresent2b.wav',
        'pastpresent3b.wav', 'pastpresent4b.wav'],
    soundsArray:[],
    soundsArray2:[],
    numSoundsLoaded: 0,
    soundsReady: false,
    currLoopingSound: "",

    //draw vars
    fps: 30,
    now: 0,
    then: 0,
    delta: 0,
    interval: 1000/60 ,

    animations: {
        background: [],
        number: [],
        spirals: []
    },

    imgPaths: ['canons/canon8/img/background.png', 'canons/canon8/img/numbers.png', 'canons/canon8/img/spirals-new.png'],
    imgEls: [],

    canvasWidth: 768,
    canvasHeight: 1024,

    //check to see if counters are at reset position
    resetCounter: true,

    //canvas hitareas
    clickareas :[

        //blackboard top area
        {
            x : 190, y: 145, width: 400, height: 290,
            handler: function(){
                canon8.handleHitAreaClick(1);
                

            }
        },

        //torso area
        {
            x : 275, y: 460, width: 250, height: 420,
            handler: function(){
                canon8.handleHitAreaClick(-1);
                
            }
        },

        //top number
        {
            x : 360, y: 0, width: 50, height:100,
            handler: function(){
                canon8.resetCounters();
                moment.play();
            }
        },

        //bottom number
        {
            x : 360, y: 924, width: 50, height: 100,
            handler: function(){
                canon8.resetCounters();
                moment.play();
            }
        }
    ],

    /**** TJS ***/
    mouseAlpha: 1,
    mouseFadeCounter: 0,
    mouse: function (xPos, yPos) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = this.mouseAlpha;
        
        if (yPos > 512 && yPos > 89) {
            this.sprite_cursor = this.sprite_cursor_arrow_down;
        } else if (yPos < 512 && yPos < 924) {
            this.sprite_cursor = this.sprite_cursor_arrow_up;
        }
        
        if (yPos  >= 925 || yPos <= 90) {
            this.sprite_cursor = this.sprite_cursor_circle;
        }
        var targetY = yPos;
        var dy = yPos - this.mouseY;
        if(Math.abs(dy) > 1) {
            this.mouseY += dy * this.easing;
        }
        var targetX = xPos;
        var dx = xPos - this.mouseX;
        if(Math.abs(dx) > 1) {
           this.mouseX += dx * this.easing;
        }
        if(this.sprite_cursor)///console.log('test');
            ctx.drawImage(this.sprite_cursor, this.mouseX - 20, this.mouseY - 20);
        if (this.mouseFadeCounter >= 60 && this.touchEnd == true) {
            this.mouseAlpha = Math.max(0, ((60 - this.mouseFadeCounter) / 20) + 1);
        
        }
        if(this.touchEnd == true){
            this.mouseFadeCounter++;
        }
        ctx.restore();


    },
    /**** TJS END *****/
    setup: function () {
        this.canvasWidth = 768;
        this.canvasHeight = 1024;
        this.loadAnimationFrames();
        this.setupSounds();
        this.background();

        //canon numbers

        /** TJS **/
        this.sprite_cursor_circle = new Image();
        this.sprite_cursor_circle.src = "canons/canon8/img/cursor-circle.png";

        this.sprite_cursor_arrow_up = new Image();
        this.sprite_cursor_arrow_up.src = "canons/canon8/img/cursor-arrow-up.gif";

        this.sprite_cursor_arrow_down = new Image();
        this.sprite_cursor_arrow_down.src = "canons/canon8/img/cursor-arrow-down.gif";
        /** TJS END **/
        
        for (i = 0; i <= this.sounds.length; i++) {
            this.soundsArray[i] = new Howl({ urls: [getPhoneGapPath() + 'canons/canon8/audio/'+this.sounds[i]], onend: function(){ canon8.backgroundSoundPlaying = false } });
            //this.soundsArray[i].loop = true;
            //console.log(this.soundsArray[i]);          
                  
                 
            
        }
        
        for (i = 0; i <= this.sounds2.length; i++) {
            var soundNum = 1;
            this.soundsArray2[i] = new Howl({ urls: [getPhoneGapPath() + 'canons/canon8/audio/'+this.sounds2[i]], onend: function(){ canon8.backgroundSoundPlaying = false } });
            //this.soundsArray[i].loop = true;
            //console.log(this.soundsArray[i]);
            
        }
        speedUpLife = new Howl({ 
            urls: [getPhoneGapPath() + 'canons/canon8/audio/speeduplife.wav'],
            onend: function(){ 
                canon8.speededUpLifSoundPlaying = false
                    
                   
                
            } ,
        });
      
       
       
        
        
        moment = new Howl({ urls: [getPhoneGapPath() + 'canons/canon8/audio/moment.wav'] });
       
        },
        reset: function () {
 

        
        
            speedUpLife.fadeOut(0, 250, function(){speedUpLife.unload(); console.log('unload it');});
            //console.log('made it');
            moment.fadeOut(0, 250, function(){moment.unload();});
            for (i = 0; i <= this.sounds.length; i++) {
                this.soundsArray[i].fadeOut(0, 250, function(){this.soundsArray[i].unload();});
                //console.log(this.soundsArray[i]);
            }
            
            for (i = 0; i <= this.sounds2.length; i++) {
                var soundNum = 1;
                this.soundsArray2[i].fadeOut(0, 250, function(){this.soundsArray2[i].unload();});
            }

            this.xPos= -100;
            this.yPos= -100;
            this.speededUpLifSoundPlaying=false;
            this.sprite_cursor_circle=null;
            this.sprite_cursor_arrow_up=null;
            this.sprite_cursor_arrow_down=null;
            this.sprite_cursor=null;
            this.backgroundSoundPlaying= false;
            this.touchEnd= false;
            this.onWindowReady= false;
            this.animationFrames= null,
            this.numFrames= 0;
            this.imgsLoaded= 0;
            this.frameCount= 0;
            this.imagesReady= false;
            this.frameDirection= 1; //1 = forward, -1 = backward
            this.paused= false;
            this.stopped= false;
            this.mouseX=-100;
            this.mouseY=-100;
            this.easing=.50;
            this.totalTop= 0;
            this.totalBottom= 0;

            this.soundsArray=[];
            this.soundsArray2=[];
            this.numSoundsLoaded= 0;
        },
    loadAnimationFrames: function () {
        this.numFrames = this.animations.spirals.length;
        for (var i = 0; i < canon8.imgPaths.length; i++) {
            var img = new Image();
            img.onload = function () {
                canon8.onImageLoaded.call(canon8);
            };
            img.src = canon8.imgPaths[i];
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
      /*  window.soundManager.setup({
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
        }); */

    },

    checkForDrawReadiness: function () {
         this.initListeners();
            this.numFrames = this.animations.spirals.length;
            this.then = Date.now();
            //this.update();
            draw();
        if (this.imagesReady && this.soundsReady && this.onWindowReady) {
            //console.log('ready to draw');
            this.initListeners();
            this.numFrames = this.animations.spirals.length;
            this.then = Date.now();
            //this.update();
            draw();
        }
    },

    initListeners: function () {
        /** TJS **/
       
        /** TJS END **/
      /*  this.canvas.onclick = function(evt){
            for(var i = 0; i < canon.clickareas.length; i++){
                var ca = canon.clickareas[i];
                if(evt.pageX >= ca.x && evt.pageX <= ca.x + ca.width){
                    if(evt.pageY >= ca.y && evt.pageY <= ca.y + ca.height){
                        ca.handler.call(canon);
                    }
                }
            }
        }; */
    },

    handleHitAreaClick: function (dir) {
        //console.log('hit area click');
        this.frameDirection = dir;
        if(this.totalTop >= 10 && this.frameDirection > 0){
            this.stopped = false;
        } else if(this.totalBottom >= 10 && this.frameDirection < 0){ 
            this.stopped = false;
        }else {
             
        }
        

        if (this.frameDirection > 0) {
            if (this.totalBottom == 0 && this.totalTop == 0) {
                //soundManager.play(this.sounds[5]);
            }
        } else {
            if (this.totalTop == 0 && this.totalBottom == 0) {
                //if going backwards and both top and bottom are at 0 reset frame count backwards
                //TJS MIGHT BE A FIX !!! //this.frameCount = this.numFrames - 1;
            }
            //this.determineLoopingSound();
        }
        
    },

    incrementCounters: function (number, counter) {
        if (counter == "top") {
            if (this.totalTop > 10){ return;} else if(this.totalTop <= 10){
            this.totalTop += number;
            }
            if(this.totalTop == 10){
                this.stopped = true;

            }
          
        } else if (counter == 'bottom') {
            // This is actually Top!
            if (this.totalBottom > 10){ return;} else if(this.totalBottom <= 10){
            this.totalBottom += number;}
            if(this.totalBottom == 10 || this.totalTop == 10){
                this.stopped = true;
                
            }
        }
    },

    resetCounters: function () {
        this.totalTop = 0;
        this.totalBottom = 0;
        this.stopped = true;
        this.frameCount = 0;
        this.background();
        this.goToFrame(0);
        canon8.numbers();
        //soundManager.stopAll();
        //soundManager.play(this.sounds[6]);

    },

    //the draw loop
    background: function () {
        //console.log('yep');
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.save();
        ctx.translate(0,20);
        ctx.drawImage(this.imgEls[0], 90, 130);
        ctx.restore();
    },

    numbers : function(){
        var animTop = canon8.animations.number[this.totalBottom];
        var animBottom = canon8.animations.number[this.totalTop];
        //drawing the top number
        ctx.save();
        ctx.translate(0,35);
        ctx.drawImage(this.imgEls[1], animTop[0], animTop[1], animTop[2], animTop[3], (this.canvasWidth/2 - (animTop[2] /2)), 5, animTop[2], animTop[3]);
        ctx.restore();
        //drawing the bottom number
          ctx.save();
        ctx.translate(0,-35);
        ctx.drawImage(this.imgEls[1], animBottom[0], animBottom[1], animBottom[2], animBottom[3], (this.canvasWidth/2 - (animBottom[2] /2)), this.canvasHeight - (animBottom[3] + 5), animBottom[2], animBottom[3]);
        ctx.restore();
    },

    update: function () {



        if (this.stopped) {
            //console.log('stopped: ', this.stopped);
            canon8.background();
            canon8.numbers();
            //speedUpLife.pause();
            if(this.totalTop == 10 || this.totalBottom == 10){
                this.totalCount = 11;
                this.totalCount = 11;
            }
            //this.determineLoopingSound();
            canon8.numbers();
            canon8.mouse(this.xPos, this.yPos);
            return;
        }
        if (this.resetCounter) this.resetCounter = false; // no longer in a reset mode cuz a frame has been drawn

        this.now = Date.now();

        if (this.paused) {
            if ((Date.now() - this.then) <= this.pauseTime) {
                canon8.background();
                this.goToFrame(0);
                //if(this.totalTop == 10 && this.frameDirection > 0){
                //    this.incrementCounters(-1, 'top');
                //    this.incrementCounters(1, 'bottom');
                //}
                this.determineLoopingSound();
                canon8.numbers();
                canon8.mouse(this.xPos, this.yPos);
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
            canon8.background();
            /** TJS END **/
            this.goToFrame(this.frameCount);
            //console.log(this.interval);
            this.determineLoopingSound();
            this.frameCount += this.frameDirection;
            if (this.frameDirection < 0) {
                if (this.frameCount <= 0) {
                    this.frameCount = this.numFrames - 1;
                    this.paused = true;

                    if (this.totalBottom > 0) this.incrementCounters(-1, 'bottom');
                    else this.incrementCounters(1, 'top');

                    

                }

            } else {

                if (this.frameCount >= this.numFrames) {
                    this.frameCount = 0;
                    this.paused = true;
                    
                    if (this.totalTop > 0 ) this.incrementCounters(-1, 'top');
                    else this.incrementCounters(1, 'bottom');

                    

                }

            }
            /** TJS **/
            /** TJS END **/
            canon8.numbers();
            canon8.mouse(this.xPos, this.yPos);
           
        }
       

    },

    touchStart:function(evt){
        canon8.touchEnd = false;
        canon8.xPos = evt.pageX || evt.touches[0].pageX;
        canon8.yPos = evt.pageY || evt.touches[0].pageY;
        for(var i = 0; i < canon8.clickareas.length; i++){
            var ca = canon8.clickareas[i];
            if(canon8.xPos >= ca.x && canon8.xPos <= ca.x + ca.width){
                if(canon8.yPos >= ca.y && canon8.yPos <= ca.y + ca.height){
                    ca.handler.call(canon8);
                }
            }
        }

    },
    touchMove:function(evt){
        canon8.mouseFadeCounter = 0;
        canon8.mouseAlpha = 1;
        canon8.xPos = evt.pageX || evt.touches[0].pageX;
        canon8.yPos = evt.pageY || evt.touches[0].pageY;
        canon8.mouse(canon8.xPos, canon8.yPos);
    },
    goToFrame: function (frame) {

        var frameSizeWidth = animations_data.frames[this.frameCount].frame.w;
        var frameSizeHeight = animations_data.frames[this.frameCount].frame.h;
        var framePosX = animations_data.frames[this.frameCount].frame.x;
        var framePosY = animations_data.frames[this.frameCount].frame.y;
        var canvasDrawX = animations_data.frames[this.frameCount].spriteSourceSize.x + 20;
        var canvasDrawY = animations_data.frames[this.frameCount].spriteSourceSize.y + -20;
        ctx.save();
        ctx.translate(0,20);
        ctx.drawImage(this.imgEls[2], framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);
        ctx.restore();

    },
    resetBackgroundMusicBoolean:function(num){
        //var tempTimeOut = setTimeout(function(){
            //canon8.backgroundSoundPlaying = false;
            //canon8.soundsArray2[num].currentTime = 0;
        //}, 1677);
    },
    resetBackgroundMusicBoolean2:function(num){
       //var tempTimeOut = setTimeout(function(){
            //canon8.backgroundSoundPlaying = false;
            //canon8.soundsArray[num].currentTime = 0;
       // }, 1677);
    },
    determineLoopingSound: function () {
        var totalValue, numLoops = -1;
        totalValue = Math.max(0, this.totalTop, this.totalBottom);
        if(this.backgroundSoundPlaying == false && this.totalBottom > 0){
            if(this.speededUpLifSoundPlaying == false){
                speedUpLife.play();
                this.backgroundSoundPlaying = true;
            }
            switch (totalValue) {
                case 0:
                    //sound.pause();
                    break;
                case 1:
                    //play song for first part
                    this.soundsArray[1].play();
                    this.resetBackgroundMusicBoolean(1);
                    this.backgroundSoundPlaying = true;
                    break;
                case 2:
                    //play song for first part
                    this.soundsArray[1].play();
                    this.resetBackgroundMusicBoolean(1);
                    this.backgroundSoundPlaying = true;
                    break;
                case 3:
                    //play song for first part
                    this.soundsArray[2].play();
                    this.resetBackgroundMusicBoolean(2);
                    this.backgroundSoundPlaying = true;
                    break;
                case 4:
                    //play song for second part
                    this.soundsArray[2].play();
                    this.resetBackgroundMusicBoolean(2);
                    this.backgroundSoundPlaying = true;
                    break;
                case 5:
                    //play song for second part
                    this.soundsArray[2].play();
                    this.resetBackgroundMusicBoolean(2);
                    this.backgroundSoundPlaying = true;
                    break;
                case 6:
                    //play song for second part
                    this.soundsArray[3].play();
                    this.resetBackgroundMusicBoolean(3);
                    this.backgroundSoundPlaying = true;
                    break;
                case 7:
                    //play song for third part:
                    this.soundsArray[3].play();
                    this.resetBackgroundMusicBoolean(3);
                    this.backgroundSoundPlaying = true;
                    break;
                case 8:
                    //play song for 4th part
                    this.soundsArray[4].play();
                    this.resetBackgroundMusicBoolean(4);
                    this.backgroundSoundPlaying = true;
                    break;
                case 9:
                    //play song for 4th part
                    this.soundsArray[4].play();
                    this.resetBackgroundMusicBoolean(4);
                    this.backgroundSoundPlaying = true;
                    break;
                case 10:
                    //play last song only twice
                    this.soundsArray[4].play();
                    this.resetBackgroundMusicBoolean(4);
                    this.backgroundSoundPlaying = true;
                    numLoops = 2;
                    break;
                default :
                    break;
            }
        }else if(this.backgroundSoundPlaying == false && this.totalTop > 0){
            if(this.speededUpLifSoundPlaying == false){
                speedUpLife.play();
                this.backgroundSoundPlaying = true;
            }
            switch (totalValue) {
                case 0:
                    //sound.pause();
                    break;
                case 1:
                    //play song for first part
                    this.soundsArray2[1].play();
                    this.resetBackgroundMusicBoolean2(1);
                    this.backgroundSoundPlaying = true;
                    break;
                case 2:
                    //play song for first part
                    this.soundsArray2[1].play();
                    this.resetBackgroundMusicBoolean2(1);
                    this.backgroundSoundPlaying = true;
                    break;
                case 3:
                    //play song for first part
                    this.soundsArray2[2].play();
                    this.resetBackgroundMusicBoolean2(2);
                    this.backgroundSoundPlaying = true;
                    break;
                case 4:
                    //play song for second part
                    this.soundsArray2[2].play();
                    this.resetBackgroundMusicBoolean2(2);
                    this.backgroundSoundPlaying = true;
                    break;
                case 5:
                    //play song for second part
                    this.soundsArray2[2].play();
                    this.resetBackgroundMusicBoolean2(2);
                    this.backgroundSoundPlaying = true;
                    break;
                case 6:
                    //play song for second part
                    this.soundsArray2[3].play();
                    this.resetBackgroundMusicBoolean2(3);
                    this.backgroundSoundPlaying = true;
                    break;
                case 7:
                    //play song for third part:
                    this.soundsArray2[3].play();
                    this.resetBackgroundMusicBoolean2(3);
                    this.backgroundSoundPlaying = true;
                    break;
                case 8:
                    //play song for 4th part
                    this.soundsArray2[4].play();
                    this.resetBackgroundMusicBoolean2(4);
                    this.backgroundSoundPlaying = true;
                    break;
                case 9:
                    //play song for 4th part
                    this.soundsArray2[4].play();
                    this.resetBackgroundMusicBoolean2(4);
                    this.backgroundSoundPlaying = true;
                    break;
                case 10:
                    //play last song only twice
                    this.soundsArray2[4].play();
                    this.resetBackgroundMusicBoolean2(4);
                    this.backgroundSoundPlaying = true;
                    numLoops = 2;
                    break;
                default :
                    break;
            }
        }
        //play whatever sound is set, if its not playing already
       // if (sound != this.currLoopingSound) this.loopSound(sound, numLoops, 1, null);

    },

    loopSound: function (soundId, numLoops, loopStart, callBack) {
        //console.log(loopStart);
       // soundManager.play(soundId, {
       //     onfinish: function () {
       //         if (numLoops < 0) canon.loopSound(soundId, numLoops, loopStart);
       //         else {
       //             if (loopStart < numLoops) {
       //                 loopStart++;
       //                 canon.loopSound(soundId, numLoops, loopStart);
//
       //             } else {
       //                 if (callBack && typeof callBack == 'function') callBack.call(canon);
       //             }
//
       //         }
       //     }
       // });

        if (this.currLoopingSound != "" && this.currLoopingSound != soundId) {
            //console.log('stopping sound: ', this.currLoopingSound);
            this.currLoopingSound
           // soundManager.stop(this.currLoopingSound);
        }

        this.currLoopingSound = soundId;
    }


}; // end canon object definition
canon8.animations.spirals = [

    [2, 2040, 1, 1],
    [824, 424, 29, 42],
    [824, 424, 29, 42],
    [775, 424, 47, 42],
    [775, 424, 47, 42],
    [778, 1814, 47, 60],
    [778, 1814, 47, 60],
    [1446, 1180, 53, 62],
    [1446, 1180, 53, 62],
    [1379, 1180, 65, 62],
    [1379, 1180, 65, 62],
    [1302, 1196, 75, 62],
    [1302, 1196, 75, 62],
    [965, 1310, 75, 78],
    [965, 1310, 75, 78],
    [888, 1314, 75, 96],
    [811, 1314, 75, 96],
    [1864, 1932, 75, 106],
    [1685, 1014, 75, 106],
    [1574, 906, 75, 106],
    [1672, 906, 75, 106],
    [1763, 1932, 99, 106],
    [1763, 1932, 99, 106],
    [1763, 1824, 109, 106],
    [1874, 1756, 109, 106],
    [1763, 1716, 109, 106],
    [1763, 1716, 109, 106],
    [1775, 1156, 109, 106],
    [1775, 1156, 109, 106],
    [310, 1932, 109, 114],
    [199, 1932, 109, 114],
    [765, 1876, 109, 144],
    [765, 1876, 109, 144],
    [654, 1876, 109, 168],
    [654, 1876, 109, 168],
    [1574, 1014, 109, 206],
    [1574, 1014, 109, 206],
    [987, 1814, 109, 228],
    [876, 1814, 109, 228],
    [1775, 914, 109, 240],
    [1775, 914, 109, 240],
    [1772, 1332, 109, 242],
    [1772, 1332, 109, 242],
    [1913, 1292, 131, 242],
    [1913, 1292, 131, 242],
    [1913, 1048, 131, 242],
    [1913, 804, 131, 242],
    [1630, 1742, 131, 242],
    [1630, 1742, 131, 242],
    [1497, 1742, 131, 242],
    [1497, 1742, 131, 242],
    [1639, 1358, 131, 242],
    [1639, 1358, 131, 242],
    [1506, 1358, 131, 242],
    [1364, 1742, 131, 242],
    [1373, 1384, 131, 242],
    [1373, 1384, 131, 242],
    [1240, 1384, 131, 242],
    [1231, 1788, 131, 242],
    [1098, 1788, 131, 242],
    [1098, 1788, 131, 242],
    [557, 946, 159, 470],
    [563, 2, 159, 470],
    [557, 474, 159, 470],
    [557, 474, 159, 470],
    [396, 946, 159, 470],
    [396, 474, 159, 470],
    [396, 2, 165, 470],
    [396, 2, 165, 470],
    [394, 1460, 185, 470],
    [394, 1460, 185, 470],
    [199, 1460, 193, 470],
    [199, 1460, 193, 470],
    [199, 984, 195, 474],
    [199, 984, 195, 474],
    [199, 2, 195, 496],
    [2, 1542, 195, 496],
    [2, 1032, 195, 508],
    [2, 1032, 195, 508],
    [2, 2, 195, 516],
    [2, 2, 195, 516],
    [2, 520, 195, 510],
    [2, 520, 195, 510],
    [199, 500, 195, 482],
    [199, 500, 195, 482],
    [581, 1418, 195, 456],
    [581, 1418, 195, 456],
    [718, 474, 195, 436],
    [718, 474, 195, 436],
    [724, 2, 195, 420],
    [724, 2, 195, 420],
    [718, 912, 195, 400],
    [718, 912, 195, 400],
    [1357, 2, 195, 396],
    [1357, 2, 195, 396],
    [1148, 798, 191, 396],
    [1148, 798, 191, 396],
    [1154, 2, 201, 396],
    [1154, 2, 201, 396],
    [1148, 400, 219, 396],
    [1148, 400, 219, 396],
    [1011, 1390, 227, 396],
    [1011, 1390, 227, 396],
    [915, 822, 231, 396],
    [915, 822, 231, 396],
    [921, 2, 231, 396],
    [921, 2, 231, 396],
    [915, 424, 231, 396],
    [915, 424, 231, 396],
    [778, 1416, 231, 396],
    [778, 1416, 231, 396],
    [1341, 798, 231, 380],
    [1341, 798, 231, 380],
    [1369, 400, 231, 354],
    [1369, 400, 231, 354],
    [1787, 2, 231, 344],
    [1787, 2, 231, 344],
    [1554, 2, 231, 344],
    [1554, 2, 231, 344],
    [1772, 462, 231, 112],
    [1772, 462, 231, 112],
    [1772, 348, 231, 112],
    [1772, 348, 231, 112],
    [1473, 1628, 231, 112],
    [1473, 1628, 231, 112],
    [1439, 1244, 231, 112],
    [1439, 1244, 231, 112],
    [1240, 1628, 231, 112],
    [1240, 1628, 231, 112],
    [1206, 1270, 231, 112],
    [1206, 1270, 231, 112],
    [421, 1932, 231, 112],
    [421, 1932, 231, 112],
    [1772, 576, 229, 112],
    [1772, 576, 229, 112],
    [1772, 690, 221, 112],
    [1772, 690, 221, 112],
    [1706, 1602, 205, 112],
    [1706, 1602, 205, 112],
    [1574, 792, 187, 112],
    [1574, 792, 187, 112],
    [1602, 348, 165, 112],
    [1602, 348, 165, 112],
    [1602, 682, 149, 108],
    [1602, 682, 149, 108],
    [1772, 804, 137, 108],
    [1772, 804, 137, 108],
    [1913, 1536, 123, 108],
    [1913, 1536, 123, 108],
    [1913, 1646, 113, 108],
    [1913, 1646, 113, 108],
    [1672, 1222, 101, 108],
    [1672, 1222, 101, 108],
    [1672, 572, 91, 108],
    [1672, 572, 91, 108],
    [1672, 462, 91, 108],
    [1672, 462, 91, 108],
    [718, 1314, 91, 100],
    [718, 1314, 91, 100],
    [915, 1220, 91, 88],
    [915, 1220, 91, 88],
    [1008, 1220, 91, 76],
    [1008, 1220, 91, 76],
    [1042, 1298, 89, 72],
    [1042, 1298, 89, 72],
    [1101, 1220, 81, 72],
    [1101, 1220, 81, 72],
    [1133, 1294, 71, 72],
    [1133, 1294, 71, 72],
    [1184, 1196, 57, 72],
    [1184, 1196, 57, 72],
    [1243, 1196, 57, 68],
    [1243, 1196, 57, 68],
    [581, 1876, 57, 54],
    [581, 1876, 57, 54],
    [724, 424, 49, 42],
    [724, 424, 49, 42],
    [396, 1418, 31, 36],
    [396, 1418, 31, 36],
    [2, 2040, 1, 1]
];

canon8.animations.number = [

    [2, 2, 123, 92],
    [127, 2, 123, 92],
    [252, 2, 123, 92],
    [377, 2, 123, 92],
    [2, 96, 123, 92],
    [127, 96, 123, 92],
    [252, 96, 123, 92],
    [377, 96, 123, 92],
    [2, 190, 123, 92],
    [127, 190, 123, 92],
    [252, 190, 123, 92],
    [252, 190, 123, 92]
]


var animations_data = {"frames": [

{
"filename": "50040.gif",
"frame": {"x":2,"y":2042,"w":1,"h":1},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50041.gif",
"frame": {"x":686,"y":1880,"w":31,"h":44},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":393,"y":705,"w":31,"h":44},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50042.gif",
"frame": {"x":686,"y":1880,"w":31,"h":44},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":393,"y":705,"w":31,"h":44},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50043.gif",
"frame": {"x":636,"y":1880,"w":49,"h":44},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":705,"w":49,"h":44},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50044.gif",
"frame": {"x":636,"y":1880,"w":49,"h":44},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":705,"w":49,"h":44},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50045.gif",
"frame": {"x":782,"y":1817,"w":49,"h":62},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":687,"w":49,"h":62},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50046.gif",
"frame": {"x":782,"y":1817,"w":49,"h":62},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":687,"w":49,"h":62},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50047.gif",
"frame": {"x":1988,"y":688,"w":55,"h":64},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":374,"y":685,"w":55,"h":64},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50048.gif",
"frame": {"x":1988,"y":688,"w":55,"h":64},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":374,"y":685,"w":55,"h":64},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50049.gif",
"frame": {"x":1518,"y":1179,"w":67,"h":64},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":374,"y":685,"w":67,"h":64},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50050.gif",
"frame": {"x":1518,"y":1179,"w":67,"h":64},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":374,"y":685,"w":67,"h":64},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50051.gif",
"frame": {"x":1440,"y":1179,"w":77,"h":64},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":685,"w":77,"h":64},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50052.gif",
"frame": {"x":1440,"y":1179,"w":77,"h":64},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":685,"w":77,"h":64},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50053.gif",
"frame": {"x":1018,"y":1219,"w":77,"h":80},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":80},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50054.gif",
"frame": {"x":1018,"y":1219,"w":77,"h":80},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":80},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50055.gif",
"frame": {"x":898,"y":1317,"w":77,"h":98},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":98},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50056.gif",
"frame": {"x":820,"y":1317,"w":77,"h":98},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":98},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50057.gif",
"frame": {"x":1820,"y":1243,"w":77,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50058.gif",
"frame": {"x":1586,"y":974,"w":77,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50059.gif",
"frame": {"x":1586,"y":865,"w":77,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50060.gif",
"frame": {"x":1586,"y":756,"w":77,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":375,"y":684,"w":77,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50061.gif",
"frame": {"x":1780,"y":1356,"w":101,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":351,"y":684,"w":101,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50062.gif",
"frame": {"x":1780,"y":1356,"w":101,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":351,"y":684,"w":101,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50063.gif",
"frame": {"x":1668,"y":944,"w":111,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":684,"w":111,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50064.gif",
"frame": {"x":1780,"y":912,"w":111,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":684,"w":111,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50065.gif",
"frame": {"x":1668,"y":835,"w":111,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":684,"w":111,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50066.gif",
"frame": {"x":1668,"y":835,"w":111,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":684,"w":111,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50067.gif",
"frame": {"x":976,"y":1310,"w":111,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":684,"w":111,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50068.gif",
"frame": {"x":976,"y":1310,"w":111,"h":108},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":684,"w":111,"h":108},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50069.gif",
"frame": {"x":1088,"y":1300,"w":111,"h":116},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":676,"w":111,"h":116},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50070.gif",
"frame": {"x":668,"y":1925,"w":111,"h":116},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":676,"w":111,"h":116},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50071.gif",
"frame": {"x":780,"y":1880,"w":111,"h":146},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":646,"w":111,"h":146},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50072.gif",
"frame": {"x":780,"y":1880,"w":111,"h":146},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":646,"w":111,"h":146},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50073.gif",
"frame": {"x":1004,"y":1817,"w":111,"h":170},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":622,"w":111,"h":170},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50074.gif",
"frame": {"x":1004,"y":1817,"w":111,"h":170},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":622,"w":111,"h":170},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50075.gif",
"frame": {"x":892,"y":1817,"w":111,"h":208},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":584,"w":111,"h":208},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50076.gif",
"frame": {"x":892,"y":1817,"w":111,"h":208},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":584,"w":111,"h":208},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50077.gif",
"frame": {"x":1228,"y":1816,"w":111,"h":230},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":562,"w":111,"h":230},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50078.gif",
"frame": {"x":1116,"y":1816,"w":111,"h":230},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":562,"w":111,"h":230},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50079.gif",
"frame": {"x":1668,"y":594,"w":111,"h":240},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":552,"w":111,"h":240},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50080.gif",
"frame": {"x":1668,"y":594,"w":111,"h":240},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":552,"w":111,"h":240},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50081.gif",
"frame": {"x":1668,"y":349,"w":111,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":548,"w":111,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50082.gif",
"frame": {"x":1668,"y":349,"w":111,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":341,"y":548,"w":111,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50083.gif",
"frame": {"x":1766,"y":1725,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50084.gif",
"frame": {"x":1766,"y":1725,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50085.gif",
"frame": {"x":1902,"y":1647,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50086.gif",
"frame": {"x":1902,"y":1402,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50087.gif",
"frame": {"x":1902,"y":1157,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50088.gif",
"frame": {"x":1902,"y":1157,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50089.gif",
"frame": {"x":1902,"y":912,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50090.gif",
"frame": {"x":1902,"y":912,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50091.gif",
"frame": {"x":1632,"y":1739,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50092.gif",
"frame": {"x":1632,"y":1739,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50093.gif",
"frame": {"x":1498,"y":1739,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50094.gif",
"frame": {"x":1646,"y":1367,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50095.gif",
"frame": {"x":1512,"y":1367,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50096.gif",
"frame": {"x":1512,"y":1367,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50097.gif",
"frame": {"x":1364,"y":1739,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50098.gif",
"frame": {"x":1378,"y":1381,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50099.gif",
"frame": {"x":1244,"y":1381,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50100.gif",
"frame": {"x":1244,"y":1381,"w":133,"h":244},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":319,"y":548,"w":133,"h":244},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50101.gif",
"frame": {"x":562,"y":948,"w":163,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":289,"y":320,"w":163,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50102.gif",
"frame": {"x":566,"y":2,"w":163,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":289,"y":320,"w":163,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50103.gif",
"frame": {"x":562,"y":475,"w":163,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":289,"y":320,"w":163,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50104.gif",
"frame": {"x":562,"y":475,"w":163,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":289,"y":320,"w":163,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50105.gif",
"frame": {"x":398,"y":948,"w":163,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":289,"y":320,"w":163,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50106.gif",
"frame": {"x":398,"y":475,"w":163,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":289,"y":320,"w":163,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50107.gif",
"frame": {"x":398,"y":2,"w":167,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":285,"y":320,"w":167,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50108.gif",
"frame": {"x":398,"y":2,"w":167,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":285,"y":320,"w":167,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50109.gif",
"frame": {"x":396,"y":1461,"w":187,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":265,"y":320,"w":187,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50110.gif",
"frame": {"x":396,"y":1461,"w":187,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":265,"y":320,"w":187,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50111.gif",
"frame": {"x":200,"y":1461,"w":195,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":257,"y":320,"w":195,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50112.gif",
"frame": {"x":200,"y":1461,"w":195,"h":472},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":257,"y":320,"w":195,"h":472},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50113.gif",
"frame": {"x":200,"y":984,"w":197,"h":476},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":316,"w":197,"h":476},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50114.gif",
"frame": {"x":200,"y":984,"w":197,"h":476},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":316,"w":197,"h":476},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50115.gif",
"frame": {"x":200,"y":2,"w":197,"h":496},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":296,"w":197,"h":496},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50116.gif",
"frame": {"x":2,"y":1545,"w":197,"h":496},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":296,"w":197,"h":496},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50117.gif",
"frame": {"x":2,"y":1034,"w":197,"h":510},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":282,"w":197,"h":510},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50118.gif",
"frame": {"x":2,"y":1034,"w":197,"h":510},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":282,"w":197,"h":510},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50119.gif",
"frame": {"x":2,"y":2,"w":197,"h":518},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":272,"w":197,"h":518},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50120.gif",
"frame": {"x":2,"y":2,"w":197,"h":518},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":272,"w":197,"h":518},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50121.gif",
"frame": {"x":2,"y":521,"w":197,"h":512},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":512},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50122.gif",
"frame": {"x":2,"y":521,"w":197,"h":512},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":512},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50123.gif",
"frame": {"x":200,"y":499,"w":197,"h":484},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":267,"w":197,"h":484},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50124.gif",
"frame": {"x":200,"y":499,"w":197,"h":484},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":267,"w":197,"h":484},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50125.gif",
"frame": {"x":584,"y":1421,"w":197,"h":458},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":458},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50126.gif",
"frame": {"x":584,"y":1421,"w":197,"h":458},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":458},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50127.gif",
"frame": {"x":726,"y":475,"w":197,"h":438},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":267,"w":197,"h":438},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50128.gif",
"frame": {"x":726,"y":475,"w":197,"h":438},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":267,"w":197,"h":438},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50129.gif",
"frame": {"x":730,"y":2,"w":197,"h":422},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":422},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50130.gif",
"frame": {"x":730,"y":2,"w":197,"h":422},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":422},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50131.gif",
"frame": {"x":726,"y":914,"w":197,"h":402},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":267,"w":197,"h":402},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50132.gif",
"frame": {"x":726,"y":914,"w":197,"h":402},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":267,"w":197,"h":402},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50133.gif",
"frame": {"x":1366,"y":2,"w":197,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50134.gif",
"frame": {"x":1366,"y":2,"w":197,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":197,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50135.gif",
"frame": {"x":1158,"y":796,"w":193,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":193,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50136.gif",
"frame": {"x":1158,"y":796,"w":193,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":193,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50137.gif",
"frame": {"x":1162,"y":2,"w":203,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":203,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50138.gif",
"frame": {"x":1162,"y":2,"w":203,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":203,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50139.gif",
"frame": {"x":1158,"y":399,"w":221,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":221,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50140.gif",
"frame": {"x":1158,"y":399,"w":221,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":221,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50141.gif",
"frame": {"x":1016,"y":1419,"w":227,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":227,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50142.gif",
"frame": {"x":1016,"y":1419,"w":227,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":255,"y":268,"w":227,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50143.gif",
"frame": {"x":924,"y":822,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50144.gif",
"frame": {"x":924,"y":822,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50145.gif",
"frame": {"x":928,"y":2,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50146.gif",
"frame": {"x":928,"y":2,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50147.gif",
"frame": {"x":924,"y":425,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50148.gif",
"frame": {"x":924,"y":425,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50149.gif",
"frame": {"x":782,"y":1420,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50150.gif",
"frame": {"x":782,"y":1420,"w":233,"h":396},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":396},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50151.gif",
"frame": {"x":1352,"y":796,"w":233,"h":382},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":382},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50152.gif",
"frame": {"x":1352,"y":796,"w":233,"h":382},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":382},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50153.gif",
"frame": {"x":1380,"y":399,"w":233,"h":356},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":356},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50154.gif",
"frame": {"x":1380,"y":399,"w":233,"h":356},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":356},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50155.gif",
"frame": {"x":1798,"y":2,"w":233,"h":346},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":346},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50156.gif",
"frame": {"x":1798,"y":2,"w":233,"h":346},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":346},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50157.gif",
"frame": {"x":1564,"y":2,"w":233,"h":346},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":346},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50158.gif",
"frame": {"x":1564,"y":2,"w":233,"h":346},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":267,"w":233,"h":346},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50159.gif",
"frame": {"x":1780,"y":349,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50160.gif",
"frame": {"x":1780,"y":349,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50161.gif",
"frame": {"x":1478,"y":1626,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50162.gif",
"frame": {"x":1478,"y":1626,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50163.gif",
"frame": {"x":1434,"y":1254,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50164.gif",
"frame": {"x":1434,"y":1254,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50165.gif",
"frame": {"x":1244,"y":1626,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50166.gif",
"frame": {"x":1244,"y":1626,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50167.gif",
"frame": {"x":1200,"y":1268,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50168.gif",
"frame": {"x":1200,"y":1268,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50169.gif",
"frame": {"x":434,"y":1934,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50170.gif",
"frame": {"x":434,"y":1934,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50171.gif",
"frame": {"x":200,"y":1934,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50172.gif",
"frame": {"x":200,"y":1934,"w":233,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":254,"y":268,"w":233,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50173.gif",
"frame": {"x":1780,"y":462,"w":231,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":256,"y":268,"w":231,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50174.gif",
"frame": {"x":1780,"y":462,"w":231,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":256,"y":268,"w":231,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50175.gif",
"frame": {"x":1780,"y":575,"w":223,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":264,"y":268,"w":223,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50176.gif",
"frame": {"x":1780,"y":575,"w":223,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":264,"y":268,"w":223,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50177.gif",
"frame": {"x":1780,"y":688,"w":207,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":280,"y":268,"w":207,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50178.gif",
"frame": {"x":1780,"y":688,"w":207,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":280,"y":268,"w":207,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50179.gif",
"frame": {"x":1712,"y":1612,"w":189,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":298,"y":268,"w":189,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50180.gif",
"frame": {"x":1712,"y":1612,"w":189,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":298,"y":268,"w":189,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50181.gif",
"frame": {"x":1586,"y":1132,"w":167,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":320,"y":268,"w":167,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50182.gif",
"frame": {"x":1586,"y":1132,"w":167,"h":112},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":320,"y":268,"w":167,"h":112},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50183.gif",
"frame": {"x":1668,"y":1245,"w":151,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":336,"y":270,"w":151,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50184.gif",
"frame": {"x":1668,"y":1245,"w":151,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":336,"y":270,"w":151,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50185.gif",
"frame": {"x":1902,"y":801,"w":139,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":348,"y":270,"w":139,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50186.gif",
"frame": {"x":1902,"y":801,"w":139,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":348,"y":270,"w":139,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50187.gif",
"frame": {"x":1754,"y":1132,"w":125,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":362,"y":270,"w":125,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50188.gif",
"frame": {"x":1754,"y":1132,"w":125,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":362,"y":270,"w":125,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50189.gif",
"frame": {"x":1780,"y":801,"w":115,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":372,"y":270,"w":115,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50190.gif",
"frame": {"x":1780,"y":801,"w":115,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":372,"y":270,"w":115,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50191.gif",
"frame": {"x":1780,"y":1021,"w":103,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":384,"y":270,"w":103,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50192.gif",
"frame": {"x":1780,"y":1021,"w":103,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":384,"y":270,"w":103,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50193.gif",
"frame": {"x":1900,"y":1892,"w":93,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50194.gif",
"frame": {"x":1900,"y":1892,"w":93,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50195.gif",
"frame": {"x":1780,"y":1465,"w":93,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50196.gif",
"frame": {"x":1780,"y":1465,"w":93,"h":110},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":110},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50197.gif",
"frame": {"x":726,"y":1317,"w":93,"h":102},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":102},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50198.gif",
"frame": {"x":726,"y":1317,"w":93,"h":102},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":102},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50199.gif",
"frame": {"x":924,"y":1219,"w":93,"h":90},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":90},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50200.gif",
"frame": {"x":924,"y":1219,"w":93,"h":90},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":93,"h":90},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50201.gif",
"frame": {"x":1096,"y":1219,"w":93,"h":78},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":269,"w":93,"h":78},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50202.gif",
"frame": {"x":1096,"y":1219,"w":93,"h":78},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":269,"w":93,"h":78},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50203.gif",
"frame": {"x":1190,"y":1193,"w":91,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":91,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50204.gif",
"frame": {"x":1190,"y":1193,"w":91,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":91,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50205.gif",
"frame": {"x":1282,"y":1193,"w":83,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":83,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50206.gif",
"frame": {"x":1282,"y":1193,"w":83,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":83,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50207.gif",
"frame": {"x":1366,"y":1179,"w":73,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":73,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50208.gif",
"frame": {"x":1366,"y":1179,"w":73,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":394,"y":270,"w":73,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50209.gif",
"frame": {"x":1244,"y":1739,"w":59,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":395,"y":270,"w":59,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50210.gif",
"frame": {"x":1244,"y":1739,"w":59,"h":74},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":395,"y":270,"w":59,"h":74},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50211.gif",
"frame": {"x":1304,"y":1739,"w":59,"h":70},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":395,"y":274,"w":59,"h":70},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50212.gif",
"frame": {"x":1304,"y":1739,"w":59,"h":70},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":395,"y":274,"w":59,"h":70},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50213.gif",
"frame": {"x":832,"y":1817,"w":59,"h":56},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":395,"y":288,"w":59,"h":56},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50214.gif",
"frame": {"x":832,"y":1817,"w":59,"h":56},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":395,"y":288,"w":59,"h":56},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50215.gif",
"frame": {"x":584,"y":1880,"w":51,"h":44},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":403,"y":300,"w":51,"h":44},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50216.gif",
"frame": {"x":584,"y":1880,"w":51,"h":44},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":403,"y":300,"w":51,"h":44},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50217.gif",
"frame": {"x":398,"y":1421,"w":33,"h":38},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":421,"y":301,"w":33,"h":38},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50218.gif",
"frame": {"x":398,"y":1421,"w":33,"h":38},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":421,"y":301,"w":33,"h":38},
"sourceSize": {"w":737,"h":1024}
},
{
"filename": "50219.gif",
"frame": {"x":2,"y":2042,"w":1,"h":1},
"rotated": false,
"trimmed": true,
"spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
"sourceSize": {"w":737,"h":1024}
}],
"meta": {
"app": "http://www.codeandweb.com/texturepacker ",
"version": "1.0",
"image": "ipad-hd.png",
"format": "RGBA8888",
"size": {"w":2048,"h":2048},
"scale": "2.56",
"smartupdate": "$TexturePacker:SmartUpdate:af100df0029dfda3d24c575e72120f51$"
}
};

/*
Canvas.addEventListener('touchend',function(event){
            canon8.touchEnd = true;
});


Canvas.addEventListener('touchmove',function(evt){
            canon8.mouseFadeCounter = 0;
            canon8.mouseAlpha = 1;
            canon8.xPos = evt.pageX || evt.touches[0].pageX;
            canon8.yPos = evt.pageY || evt.touches[0].pageY;
            canon8.mouse(xPos, yPos);
        
});

Canvas.addEventListener('touchstart',function(evt){
            canon8.touchEnd = false;
            canon8.xPos = evt.pageX || evt.touches[0].pageX;
            canon8.yPos = evt.pageY || evt.touches[0].pageY;
            for(var i = 0; i < canon8.clickareas.length; i++){
                var ca = canon8.clickareas[i];
                if(xPos >= ca.x && xPos <= ca.x + ca.width){
                    if(yPos >= ca.y && yPos <= ca.y + ca.height){
                        ca.handler.call(canon8);
                    }
                }
            }
});

Canvas.addEventListener('mouseup',function(event){
            canon8.touchEnd = true;
});

Canvas.addEventListener('mousemove',function(evt){
            canon8.mouseFadeCounter = 0;
            canon8.mouseAlpha = 1;
            canon8.xPos = evt.pageX || evt.touches[0].pageX;
            canon8.yPos = evt.pageY || evt.touches[0].pageY;
            canon8.mouse(xPos, yPos);
        
});


Canvas.addEventListener('mousedown',function(evt){
            canon8.touchEnd = false;
            canon8.xPos = evt.pageX || evt.touches[0].pageX;
            canon8.yPos = evt.pageY || evt.touches[0].pageY;
            for(var i = 0; i < canon8.clickareas.length; i++){
                var ca = canon8.clickareas[i];
                if(xPos >= ca.x && xPos <= ca.x + ca.width){
                    if(yPos >= ca.y && yPos <= ca.y + ca.height){
                        ca.handler.call(canon8);
                    }
                }
            }
});

*/
/*
function draw (){

  requestAnimationFrame(draw);
  canon8.update();
}

// load imgPaths and sounds before window load just to get it started.
canon8.setup();
canon8.onWindowReady = true;
canon8.checkForDrawReadiness();
*/





