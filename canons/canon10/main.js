/***************************/
/* Sound Component for web */
/***************************/

//document.addEventListener("deviceready", onDeviceReady, false);





// onSuccess Callback
        //
        function onSuccess() {
            //console.log("playAudio():Audio Success");
        }

        // onError Callback
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }






function pad(n) {
    if (n < 10)
        return "0" + n;
    return n;
}

/********************/
/* Global Variables */
/********************/

//CANON 10 SOUNDS
var goodSound, dust, badSound,mask;
var drum1a=[], drum1b=[],drum2=[],drum3=[];

var canon10 = {
    x:0,
    touched:false,
    y:0,
    touchEndOverEye: false,
    easing: 0.6,
    cursor:0,
    introSentenceAlpha: .0,
    introSentenceDisable:false,
    drumCount:1,
    drum1Play: false,
    drum2Play: false,
    drum3Play: false,
    drum1a:[],
    drum1b:[],
    drum2:[],
    drum3:[],
    switchGood:['1','2','3','4','5','6','7','8','9','10','10','1'],
    switchBad:['1','2','3','4','5','6','7','8','9','10','10','1'],
    switchIs:['1','2','3','4','5','6','7','8','9','10','10','9'],
    switchFor:['1','2','3','4','5','6','7','8','9','10','9','8'],
    cursorImages:[],
    portraitImages:[],
    goodWordsImages:[],
    badWordsImages:[],
    bigWordTouch: false,
    forTheImages:[],
    isTheImages:[],
    portraitFrame:0,
    offsetX:50,
    offsetY:60,
    sprite_is_the: null,
    sprite_intro_sentence: null,
    sprite_ripple: null,
    fps: 30,
    interval: null,
    maskSize: 0,
    eyeBallClickCount: 0,
    eyeBallClicked: false,
    maskIsDone:false,
    textClicked: false,
    bigTypeClicked:false,
    rs: 2.31,
    maskHeight: 0,
    soundLoaded: false,
    now:Date.now(),
    then:Date.now(),
    delta: null,
    xPos: -100,
    yPos: -100,
    go: false,
    sizeC: 76,
    dx: 0,
    dy: 0,
    offset: 5.5,
    badSoundLoad:false,
    goodSoundLoad:false,
    dustSoundLoad:false,
    mode: 'start',
    maskSoundStarted :false,
    maskSoundDone :false,
    frameCount:0,
    frameCountBigWords:0,
    frameCountForThe:0,
    frameCountIsThe:0,
    goodSound:null,
    badSound:null,
    dust:null,

    portraits: function () {
        if(this.eyeBallClickCount > 0){
            var increaseMask = 14*this.rs;
            if(this.maskSize > 58*this.rs){
                increaseMask = 10*this.rs;
            } else if(this.maskSize > 74*this.rs){
                increaseMask = 20*this.rs;
            } else if(this.maskSize > 97*this.rs){
                increaseMask = 35*this.rs;
            }
            ctx.save();
            ctx.translate(50,60);
            ctx.scale(this.rs,this.rs);
            ctx.beginPath();
            ctx.arc(188/this.rs, 230/this.rs, this.maskSize+=increaseMask, Math.PI * 2, false);
            ctx.clip();
            this.playMaskSound();
            if(this.eyeBallClicked == true){
                if (this.portraitFrame > 0){ if(this.frameCount % 12 == 0){ this.portraitFrame -= 1; }}
            } else if(this.eyeBallClicked == false){
                if (this.portraitFrame < 2){ if(this.frameCount % 12 == 0){ this.portraitFrame += 1; }}
            }
            ctx.drawImage(this.portraitImages[this.portraitFrame],0,0);//50/this.rs,60/this.rs
            //ctx.drawImage(this.sprite_ripple,14,0);
            ctx.restore();
            if(this.maskSize > 180*this.rs){
                this.maskIsDone = true;
                // Silence is golden
            }
            if(this.maskSize > 120*this.rs){
                this.introSentenceDisable = true;
                // Silence is golden
            }
        }

    },
    bigWords: function () {
        ctx.save();
        ctx.scale(this.rs,this.rs);
        if(this.eyeBallClicked == true){
            ctx.drawImage(this.badWordsImages[this.frameCountBigWords % 29],110/this.rs,825/this.rs);
        } else if(this.eyeBallClicked == false){
            ctx.drawImage(this.goodWordsImages[this.frameCountBigWords % 29],110/this.rs,825/this.rs);
        }
        ctx.restore();
    },
    bottomIntroSentence: function () {
        ctx.save();
        ctx.scale(this.rs,this.rs);
        ctx.globalAlpha = this.introSentenceAlpha;
        ctx.drawImage(this.sprite_intro_sentence,55/this.rs,920/this.rs);
        ctx.restore();
    },
    bottomSentence: function () {
        ctx.save();
        ctx.scale(this.rs,this.rs);
        ctx.drawImage(this.sprite_is_the,110/this.rs,920/this.rs);
        ctx.restore();
    },

    bottomSentenceWord1: function () {
        ctx.save();
        ctx.scale(this.rs,this.rs);
        ctx.drawImage(this.isTheImages[this.frameCountIsThe % 29],193/this.rs,920/this.rs);
        ctx.restore();
    },
    bottomSentenceWord2: function () {
        ctx.save();
        ctx.scale(this.rs,this.rs);
        ctx.drawImage(this.forTheImages[this.frameCountForThe % 29],486/this.rs,920/this.rs);
        //ctx.drawImage(this.sprite_ripple,14,0);
        ctx.restore();
    },

    update:function(){
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta > this.interval) 
        {    
            this.then = this.now - (this.delta % this.interval);
            // ... Code for Drawing the Frame ...
            //if(this.frameCount < 40){
            //    this.bigWords();
            //}
            if(this.goodSoundLoad == true && this.badSoundLoad == true && this.dustSoundLoad == true){this.mode = 'start';}
            ctx.fillStyle = '#000';
            ctx.fillRect(0 ,0, canvasWidth,canvasHeight);

            
            switch(this.mode){
                case 'start':

                    this.portraits();

                   if(!this.introSentenceDisable){
                       this.bottomIntroSentence();
                   }
                   
                   if(this.maskIsDone){
                       this.bigWords();
                       if(this.bigTypeClicked){
                           this.bottomSentence();
                           this.bottomSentenceWord1();
                           this.bottomSentenceWord2();
                       }
                   }
                    this.touchMove();
                    this.playDrums();
                    break;
            }
          
            this.frameCount++;
            if(this.bigWordTouch == true){   
                this.frameCountBigWords++;                
            }
            if(this.eyeBallClickCount == 1){
                this.frameCountBigWords++; 
            }
            if(this.firstWordTouch == true){
                this.frameCountIsThe++;
            }
            if(this.secondWordTouch == true){
                this.frameCountForThe++;
            }
        }
    },
    preloadImages:function(){
        //Ripple
        this.sprite_is_the=new Image();
        this.sprite_is_the.src="canons/canon10/img/is-the.gif";
        
        this.sprite_intro_sentence=new Image();
        this.sprite_intro_sentence.src="canons/canon10/img/full-sentence.gif";

        // Cursors
        for (i = 0; i <= 11; i++) {
            var imageNum = pad(i+1);
            this.cursorImages[i] = new Image();
            this.cursorImages[i].src = 'canons/canon10/img/cursors/'+imageNum+'.gif';
        }
        

        // Preload Portraits
        for (i = 0; i <= 2; i++) {
            var imageNum = pad(i+1);
            this.portraitImages[i] = new Image();
            this.portraitImages[i].src = 'canons/canon10/img/portraits/'+imageNum+'.gif';
        }
        

        // GoodWords
        for (i = 0; i <= 29; i++) {
            var imageNum = pad(i+1);
            this.goodWordsImages[i] = new Image();
            this.goodWordsImages[i].src = 'canons/canon10/img/goodWords/'+imageNum+'.gif';
        }
        

        // badWords
        for (i = 0; i <= 29; i++) {
            var imageNum = pad(i+1);
            this.badWordsImages[i] = new Image()
            this.badWordsImages[i].src = 'canons/canon10/img/badWords/'+imageNum+'.gif';
        }
        

        // For the Words
        for (i = 0; i <= 29; i++) {
            var imageNum = pad(i+1);
            this.forTheImages[i] = new Image()
            this.forTheImages[i].src = 'canons/canon10/img/forThe/'+imageNum+'.gif';
        }
        

        // is The Words
        for (i = 0; i <= 29; i++) {
            var imageNum = pad(i+1);
            this.isTheImages[i] = new Image()
            this.isTheImages[i].src = 'canons/canon10/img/isThe/'+imageNum+'.gif';
        }
    
        draw();

    },
    playMaskSound:function(){
        if(this.maskSoundStarted == false){
            this.maskSoundStarted = true;
            drum1a[3].play();
            setTimeout(function(){
                canon10.maskSoundDone = true;
            },1000);
        }
    },
    checkIfWordIsBeingTouched: function(mouseV, mouseH){
        // Big Word
        if( mouseV>820 && mouseV<900 && mouseH>110 && mouseH<657 ){
            this.bigWordTouch = true;
        } else {
            this.bigWordTouch = false;
        }
        // First Word
        if( mouseV>921 && mouseV<938 && mouseH>192 && mouseH<363 ){
            this.firstWordTouch = true;
        } else {
            this.firstWordTouch = false;
        }
        // Second Word
        if( mouseV>921 && mouseV<938 && mouseH>487 && mouseH<656 ){
            this.secondWordTouch = true;
        } else {
            this.secondWordTouch = false;
        }

    },
    setup:function(){
        this.interval = 1000/this.fps;
        ctx.fillStyle= "#fff";

        ctx.fillRect(0,   0, canvasWidth,canvasHeight);
        this.preloadImages();
        
        ctx.globalCompositeOperation = "source-over"; 

        
        goodSound = new Howl({ urls: [getPhoneGapPath() + 'canons/canon10/audio/voicesGOOD2.wav'], loop: true, onload: function(){ this.goodSoundLoad = true;} }); //new Audio();
        goodSound.play();
        goodSound.volume(0);
         
        mask = new Howl({ urls: [getPhoneGapPath() + 'canons/canon10/audio/4.wav']});
        mask.volume(1);
        

        badSound = new Howl({ urls: [getPhoneGapPath() + 'canons/canon10/audio/voicesBAD1.wav'], loop: true,onload: function(){ this.badSoundLoad = true;}});
        badSound.play();
        badSound.volume(0);

        dust = new Howl({ urls: [getPhoneGapPath() + 'canons/canon10/audio/dust.wav'], loop: true,onload: function(){ this.dustSoundLoad = true;} });
        dust.play();
       




        for (i = 0; i <= 11; i++) {
            var soundNum = 1;
            drum1a[i] = new Howl({ urls: [getPhoneGapPath() + 'canons/canon10/audio/'+this.switchGood[i]+'.wav']});
       }
        for (i = 0; i <= 11; i++) {
             var soundNum = 1;
             drum1b[i] =  drum1b[i];
        }
        for (i = 0; i <= 11; i++) {
            var soundNum = 1;
            drum2[i] = drum1b[i];
             if(i < 10){
                 drum2[i] = drum1b[i];
             } else if(i == 10){
                 drum2[i] = drum1b[9];
             } else if(i == 11){
                 drum2[i] = drum1b[1];
             }
           }

        


    },

    reset:function(){
        this.mode = 'nothing';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0 ,0, canvasWidth,canvasHeight);
        this.dx = 0;
        this.dy = 0;
        this.sizeC = 76;
        this.go = false;
        this.maskHeight = 0;
        touchEndOverEye= false;
        this.cursor=0;
        this.introSentenceAlpha= .0;
        this.introSentenceDisable=false;
        this.drumCount=1;
        this.drum1Play= false;
        this.drum2Play= false;
        this.drum3Play= false;
        this.bigWordTouch= false;
        this.portraitFrame=0;
        this.offsetX=50;
        this.offsetY=60;
        this.sprite_is_the= null;
        this.maskSize= 0;
        this.eyeBallClickCount= 0;
        this.eyeBallClicked= false;
        this.maskIsDone=false;
        thistextClicked= false;
        this.bigTypeClicked=false;
        this.maskHeight= 0;
        this.soundLoaded= false;
        this.delta= null;
        this.xPos= -100;
        this.yPos= -100;
        this.go= false;
        this.sizeC= 76;
        this.dx= 0;
        this.dy= 0;
        this.offset= 5.5;
        this.mode= 'start';
        this.maskSoundStarted=false;
        this.maskSoundDone=false;
        this.frameCount=0;
        this.frameCountBigWords=0;
        this.frameCountForThe=0;
        this.frameCountIsThe=0;
        this.badSoundLoad=false;
        this.goodSoundLoad=false;
        this.dustSoundLoad=false;

        // break;
        dust.fadeOut(0, 250, function(){dust.unload();});
        goodSound.fadeOut(0, 250, function(){goodSound.unload();});
        badSound.fadeOut(0, 250, function(){badSound.unload();});
    
        
    },
    touchStart:function(event){
       this.xPos = event.pageX || event.touches[0].pageX;
       this.yPos = event.pageY || event.touches[0].pageY;
       var mouseH = event.pageX || event.touches[0].pageX;
       var mouseV = event.pageY || event.touches[0].pageY;
       
       this.checkMouseDistanceFromEye(mouseV,mouseH,this.rs);
       // EYEBALL
       if(this.maskIsDone == true){
       if( mouseV>91*this.rs+this.offsetY && mouseV<111*this.rs+this.offsetY && mouseH>71*this.rs+this.offsetX && mouseH<89*this.rs+this.offsetX ){
           this.eyeBallClickCount++;      
           this.frameCount = 0;  
           this.frameCountBigWords += Math.ceil((Math.random() * 30))
           this.eyeBallClicked = !this.eyeBallClicked;
            if(this.eyeBallClickCount == 2){
                this.bigTypeClicked = true;
            }
       } 
        }
        // BIG TYPE
        if( mouseV>820 && mouseV<900 && mouseH>110 && mouseH<547 ){
            this.bigTypeClicked = true;
            if(this.eyeBallClickCount == 1){
                this.eyeBallClicked = !this.eyeBallClicked;
            }
            if(this.touchEndOverEye == true && this.eyeBallClicked == 0){
                this.eyeBallClickCount++;
            }
        }
      


   //
    },
    touchEnd:function(x,y){
        // Check to see if touch has ended and that it ended over the eye
        if(this.touched == true || this.touchEndOverEye == true ){ return; }
       
        // if it ended over the eye set boolean to true to stop this function from repeating
        this.touchEndOverEye = true; 
       
        var mouseH = this.xPos;
        var mouseV = this.yPos;
        
        // DID YOU END YOUR TOUCH ON THE EYE 
        if( mouseV>91*this.rs+this.offsetY && mouseV<111*this.rs+this.offsetY && mouseH>71*this.rs+this.offsetX && mouseH<89*this.rs+this.offsetX ){
            this.eyeBallClickCount = 1;      
            this.frameCount = 0;  
            this.frameCountBigWords += Math.ceil((Math.random() * 30))
            this.eyeBallClicked = !this.eyeBallClicked;
            if(this.eyeBallClickCount == 2){
                this.bigTypeClicked = true;
            }
       } 
    },
    soundManager:function(volume){
        console.log(this.eyeBallClickCount);
        if(this.eyeBallClickCount == 0){
            dust.volume(volume);
        } else if(this.eyeBallClickCount == 1){
            dust.pause();
            badSound.volume(0);
            goodSound.volume(volume);
        } else if(this.eyeBallClickCount == 2){
            dust.pause();
            goodSound.volume(volume);
            badSound.volume(0);
        } else if(this.eyeBallClickCount == 3){
            dust.pause();
            goodSound.volume(0);
            badSound.volume(volume);
        }else if(this.eyeBallClickCount % 2 == 0){
            dust.pause();
            goodSound.volume(volume);
            badSound.volume(0);
        } else if(this.eyeBallClickCount % 2 == 1){
            dust.pause();
            badSound.volume(volume);
            goodSound.volume(0); 
        }
    },
    playDrums:function(){
        //if(!this.bigWordTouch && !this.firstWordTouch && !this.secondWordTouch && this.eyeBallClickCount > 0 && ){
        //console.log(this.maskSoundDone);
        if(this.maskSoundDone == true){
            if(this.drumCount % 3 == 0 && this.drum1Play == false){
                this.drum1Play = true;
                if(this.eyeBallClickCount % 2 == 0){
                    drum1a[Math.floor(Math.random() * 11)].play();
                } else if(this.eyeBallClickCount % 2 == 1){
                    drum1a[Math.floor(Math.random() * 11)].play();  
                }
            } else if(this.drumCount % 3 == 1 && this.drum2Play == false){
                this.drum2Play = true;
                drum1a[Math.floor(Math.random() * 11)].play();
            } else if(this.drumCount % 3 == 2 && this.drum3Play == false){
                this.drum3Play = true;
                drum1a[Math.floor(Math.random() * 11)].play();
            }
            if(this.frameCount % 30 == 0){ this.drumCount += 1; if(this.drumCount % 3 == 0){this.resetDrums();} }
        }
    },
    resetDrums:function(){
        this.drum1Play = false;
        this.drum2Play = false;
        this.drum3Play = false;
    },
    checkMouseDistanceFromEye:function(mouseV,mouseH,rs){
         var offsetX = this.offsetX;
         var offsetY = this.offsetY;
         if( mouseV>91*rs+offsetY && mouseV<111*rs+offsetY && mouseH>71*rs+offsetX && mouseH<89*rs+offsetX ){          
        if(this.maskIsDone == false){
            this.touchEnd(this.xPos, this.yPos);
          }
          this.cursor = 11;//set the castnum of sprite (8) to 160
          this.soundManager(.0);//set the volume of sound 2 to 0
          
          this.introSentenceAlpha = .67;//set the forecolor of sprite (15) to 248

        } else  if( mouseV>86*rs+offsetY && mouseV<118*rs+offsetY && mouseH>65*rs+offsetX && mouseH<95*rs+offsetX ){
          this.cursor = 10;//set the castnum of sprite (8) to 159
          this.soundManager(.09);//set the volume of sound 2 to 23
          this.introSentenceAlpha = .67;//set the forecolor of sprite (15) to 248
        } else if( mouseV>80*rs+offsetY && mouseV<124*rs+offsetY && mouseH>58*rs+offsetX && mouseH<102*rs+offsetX ){
          this.cursor = 9;//set the castnum of sprite (8) to 158
          this.soundManager(.18);//set the volume of sound 2 to 46
          this.introSentenceAlpha = .53;//set the forecolor of sprite (15) to 249
        } else if( mouseV>73*rs+offsetY && mouseV<130*rs+offsetY && mouseH>52*rs+offsetX && mouseH<109*rs+offsetX ){
          this.cursor = 8;//set the castnum of sprite (8) to 157
          this.soundManager(.27);//set the volume of sound 2 to 69
          this.introSentenceAlpha = .53;//set the forecolor of sprite (15) to 249
        } else if( mouseV>67*rs+offsetY && mouseV<138*rs+offsetY && mouseH>45*rs+offsetX && mouseH<117*rs+offsetX){
          this.cursor = 7;
          //set the castnum of sprite (8) to 156
          this.soundManager(.36);//set the volume of sound 2 to 92
          this.introSentenceAlpha = .47;//set the forecolor of sprite (15) to 250
        }else if( mouseV>59*rs+offsetY && mouseV<147*rs+offsetY && mouseH>38*rs+offsetX && mouseH<126*rs+offsetX ){
          this.cursor = 6;//set the castnum of sprite (8) to 155
          this.soundManager(.45);//set the volume of sound 2 to 115
          this.introSentenceAlpha = .47;//set the forecolor of sprite (15) to 250
        }else if( mouseV>51*rs+offsetY && mouseV<157*rs+offsetY && mouseH>30*rs+offsetX && mouseH<136*rs+offsetX ){
          this.cursor = 5;//set the castnum of sprite (8) to 154
          this.soundManager(.54);//set the volume of sound 2 to 138
          this.introSentenceAlpha = .33;//set the forecolor of sprite (15) to 251
        } else if( mouseV>43*rs+offsetY && mouseV<167*rs+offsetY && mouseH>21*rs+offsetX && mouseH<145*rs+offsetX ){
          this.cursor = 4;//set the castnum of sprite (8) to 153
          this.soundManager(.63);//set the volume of sound 2 to 161
          this.introSentenceAlpha = .27; //set the forecolor of sprite (15) to 252
        }else if( mouseV>35*rs+offsetY && mouseV<195*rs+offsetY && mouseH>15*rs+offsetX && mouseH<168*rs+offsetX ){
          this.cursor = 3;//set the castnum of sprite (8) to 152
          this.soundManager(.72);//set the volume of sound 2 to 184
          this.introSentenceAlpha = .14; //set the forecolor of sprite (15) to 253
        }else if( mouseV>26*rs+offsetY && mouseV<251*rs+offsetY && mouseH>10*rs+offsetX && mouseH<205*rs+offsetX ){
          this.cursor = 2;//set the castnum of sprite (8) to 151
          this.soundManager(.81);//set the volume of sound 2 to 207
          this.introSentenceAlpha = .07; //set the forecolor of sprite (15) to 254
        } else if( mouseV>15*rs+offsetY && mouseV<320*rs+offsetY && mouseH>4*rs+offsetX && mouseH<246*rs+offsetX ){
          this.cursor = 1;//set the castnum of sprite (8) to 150
          this.soundManager(.81);//set the volume of sound 2 to 207
          this.introSentenceAlpha = 0; //set the forecolor of sprite (15) to 255
        }else if( mouseV>0 && mouseV<400*rs+offsetY && mouseH>0 && mouseH<288*rs+offsetX ){
          this.cursor = 0;//set the castnum of sprite (8) to 149
          this.soundManager(.81);//set the volume of sound 2 to 207
          this.introSentenceAlpha = 0;  //set the forecolor of sprite (15) to 255
        
        } 
    },
    touchMove:function(event){
        var mouseH = this.xPos;
        var mouseV = this.yPos;
        var rs = this.rs;
        var offsetX = this.offsetX;
        var offsetY = this.offsetY;
        //set the forecolor of sprite (8) to 250
        ctx.save();
        //ctx.translate(50,60);
        this.checkMouseDistanceFromEye(mouseV,mouseH,rs);
        ctx.restore();
        //console.log(this.cursor);
        // Make the cursor bigger without making 
        // cursor zones bigger. 
        rs = rs + .25;
        var targetY = this.yPos;
        var dy = mouseV - this.y;
        if(Math.abs(dy) > 1) {
            this.y += dy * this.easing;
        }
        var targetX = this.xPos;
        var dx = mouseH - this.x;
        if(Math.abs(dx) > 1) {
           this.x += dx * this.easing;
        }
        
        if(this.cursor == 11){
            var centerPointX =  ((this.x-this.cursorImages[this.cursor].width*rs/2)+82*rs);
            var centerPointY =  ((this.y-this.cursorImages[this.cursor].height*rs/2)+60*rs);
        } else if(this.cursor == 10){
            var centerPointX =  ((this.x-this.cursorImages[this.cursor].width*rs/2)+11*rs);
            var centerPointY =  ((this.y-this.cursorImages[this.cursor].height*rs/2)+3*rs);
        } else{
            var centerPointX =  this.x-this.cursorImages[this.cursor].width*rs/2;
            var centerPointY =  this.y-this.cursorImages[this.cursor].height*rs/2;
        }

        this.checkIfWordIsBeingTouched(mouseV, mouseH);

        ctx.save();
        ctx.scale(rs,rs);
        ctx.drawImage(this.cursorImages[this.cursor],centerPointX/rs,centerPointY/rs );
        ctx.restore();
    },
   
}

/******************/
/*      Draw      */
/******************/




/*******************/
/* Click Functions */
/*******************/

/******************************/
/*        Start Draw          */
/*  Once everything is loaded */
/******************************/
//window.onload = function(){
//  
//    canon10.setup();
//    console.log('setup');
//}
    
    




