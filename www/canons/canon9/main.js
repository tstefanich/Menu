/********************/
/* Global Variables */
/********************/

var soundsWordsFiles = ['belief', 'heart','hope','idea','language','life','mind','space','time','truth','unity','vision'];
var soundsWords=[];
var backgroundSounds=[];
var soundsBackgroundFiles = ['nowywalc','nowywalc2','nowywalc3','nowywalc4','nowywalc5','nowywalc6','nowywalc7','nowywalc8-final','baby2'];
var baby1;
var shot;

    

    
 
/********************/
/* Global Variables */
/********************/


/* FOR INDIVIDUAL TESTING

var canvasWidth = 768;
var canvasHeight = 1024;


var Canvas = document.getElementById('myCanvas');
var ctx  = Canvas.getContext('2d');
ctx.width=764;
ctx.height=1024;


   function getPhoneGapPath() {
            var path = window.location.pathname;
            path = path.substr( 0, path.length - 10 );
            path = ''; // THIS WAS ADDED FOR THE RUNNING LOCALLY
            return path;
        };
*/







var canon9 = {
    counter: 1,
    fps: 30,
    then: Date.now(),
    delta:null,
    interval:null,
    now: null,
    isAnimating: false,
    frameCount:0,
    mode:null,
    currentToll: '5734000000',
    xPos:-100,
    yPos:-100,
    sprite_cursor: null,
    sprite_manGettingShot: null,
    backgroundMusicDirection:'buildUp',
    backgroundMusic:0,
    mouseAlpha:1,
    mouseFadeCounter:0,
    mouse: function(xPos, yPos){
        //Draw Mouse Cursor
        ctx.save();
        ctx.globalAlpha = this.mouseAlpha;
        ctx.drawImage(this.sprite_cursor, xPos-40, yPos-42, 79, 82);
        ctx.restore();

        // Fade out when counter is too high (1 second)
        if(this.mouseFadeCounter >= 60){
            this.mouseAlpha = Math.max(0, ((60-this.mouseFadeCounter)/20)+1);              
        }
        this.mouseFadeCounter++;
    },
    setDeathTollZero:function ()
    {
        var str="0000000000";
        var n=str.split("");
        var menus = document.getElementsByClassName("number");
        for ( var i = 0; i < menus.length; i ++)
        {
          menus[i].className = "number number-"+n[i]+" active";
        }
        setTimeout(function() {
                var menus = document.getElementsByClassName("number");
                for (var i = 0; i < menus.length; i ++ )
                {
                    menus[i].className = "number number-"+n[i]+"";
                  
                }
              }, 250);
    },
    deathTollStart:function ()
    {
        var str="5734000000";
        var n=str.split("");
        var menus = document.getElementsByClassName("number");
        for ( var i = 0; i < menus.length; i ++)
        {
          menus[i].className = "number number-"+n[i]+" active";
        }
        setTimeout(function() {
                var menus = document.getElementsByClassName("number");
                for (var i = 0; i < menus.length; i ++ )
                {
                    menus[i].className = "number number-"+n[i]+"";
                  
                }
              }, 250);
    },
    deathTollSubtract:function ()
    {
        this.currentToll = parseInt(this.currentToll);
        this.currentToll = this.currentToll - 1;
        var n=this.currentToll.toString().split("");
        var menus = document.getElementsByClassName("number");
        for (var i = 0; i < menus.length; i ++ )
        {
          if(menus[i].hasClass('number-'+n[i]+'')){
            menus[i].className = "number number-"+n[i]+"";
          } else{
            menus[i].className = "number number-"+n[i]+" active";
          }
        }
        setTimeout(function() {
            var menus = document.getElementsByClassName("number");
            for (var i = 0; i < menus.length; i ++ )
            {
                menus[i].className = "number number-"+n[i]+"";
              
            }
          }, 250);
     },
    stage: function (){
        var animation_data = [
            [2, 2, 285, 100]
        ];
        ctx.fillStyle= "#000000";
        ctx.fillRect(0,   0, canvasWidth, canvasHeight);
        var frameSizeWidth = animation_data[this.frameCount][2];
        var frameSizeHeight = animation_data[this.frameCount][3];
        var framePosX = animation_data[this.frameCount][0];
        var framePosY = animation_data[this.frameCount][1];
        var canvasDrawX = 230 + (300 - animation_data[this.frameCount][2]);
        var canvasDrawY = 250 + (600 - animation_data[this.frameCount][3]);
        ctx.drawImage(this.sprite_manGettingShot, framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);

    },
    man: function () {
        var animation_data = [
            [2, 2, 285, 100],
            [289, 638, 285, 354], 
            [289, 638, 285, 354], 
            [289, 638, 285, 354], 
            [289, 638, 285, 354], 
            [289, 638, 285, 354], 
            [289, 638, 285, 354], 
            [2, 636, 285, 352], 
            [2, 636, 285, 352], 
            [2, 636, 285, 352], 
            [2, 636, 285, 352], 
            [863, 682, 285, 360], 
            [863, 682, 285, 360], 
            [863, 682, 285, 360], 
            [863, 682, 285, 360], 
            [863, 682, 285, 360], 
            [863, 682, 285, 360], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [576, 654, 285, 356], 
            [2, 990, 285, 364], 
            [2, 990, 285, 364], 
            [2, 990, 285, 364], 
            [2, 990, 285, 364], 
            [289, 994, 285, 366]
        ];
        if(this.frameCount == 0){
            soundsWords[Math.floor(Math.random() * 11)].play();
        }
        if(animation_data.length == this.frameCount){
           this.isAnimating = false;
           ctx.fillStyle= "#000000";
           ctx.fillRect(0,   0, canvasWidth, canvasHeight);
           var frameSizeWidth = animation_data[this.frameCount-1][2];
           var frameSizeHeight = animation_data[this.frameCount-1][3];
           var framePosX = animation_data[this.frameCount-1][0];
           var framePosY = animation_data[this.frameCount-1][1];
           var canvasDrawX = 230 + (300 - animation_data[this.frameCount-1][2]);
           var canvasDrawY = 250 + (600 - animation_data[this.frameCount-1][3]);
           ctx.drawImage(this.sprite_manGettingShot, framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);

        } else {
           ctx.fillStyle= "#000000";
           ctx.fillRect(0,   0, canvasWidth, canvasHeight);
           var frameSizeWidth = animation_data[this.frameCount][2];
           var frameSizeHeight = animation_data[this.frameCount][3];
           var framePosX = animation_data[this.frameCount][0];
           var framePosY = animation_data[this.frameCount][1];
           var canvasDrawX = 230 + (300 - animation_data[this.frameCount][2]);
           var canvasDrawY = 250 + (600 - animation_data[this.frameCount][3]);
           ctx.drawImage(this.sprite_manGettingShot, framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);
           this.frameCount++;
        }

    },
    setup:function ()
    {   
        this.interval = 1000/this.fps;
        this.mode = 'blankStage';
        this.preloadImages();

        // SOUNDS
        messageThere = new Howl({ urls: [getPhoneGapPath() + 'canons/canon9/audio/messagethere.mp3'] }); //new Audio();
        messageThere.play();

        shot = new Howl({ urls: [getPhoneGapPath() + 'canons/canon9/audio/shot3.mp3'] }); //new Audio();

        baby1 = new Howl({ urls: [getPhoneGapPath() + 'canons/canon9/audio/baby1.mp3'], loop:true }); //new Audio();
        baby1.play();

        for (var i = 0; i < soundsWordsFiles.length; i++) {
            soundsWords[i] = new Howl({ urls: [getPhoneGapPath() + 'canons/canon9/audio/'+soundsWordsFiles[i]+'.mp3'] });
        };

        for (var i = 0; i < soundsBackgroundFiles.length; i++) {
            backgroundSounds[i] = new Howl({ urls: [getPhoneGapPath() + 'canons/canon9/audio/'+soundsBackgroundFiles[i]+'.mp3'],loop:true });
        };


        draw();
    },
    preloadImages:function ()
    {
        this.sprite_manGettingShot=new Image();
        this.sprite_manGettingShot.src="canons/canon9/img/animation/mangettingshot/sprite.png";

        this.sprite_cursor=new Image();
        this.sprite_cursor.src="canons/canon9/img/cursor-hd.gif";
    },
    touchMove:function(event){
        this.xPos = event.pageX || event.touches[0].pageX;
        this.yPos = event.pageY || event.touches[0].pageY;
        this.mouseFadeCounter = 0;
        this.mouseAlpha = 1;
    },
    touchStart:function(event){
        this.mouseFadeCounter = 0;
        this.mouseAlpha = 1;
        shot.play();
         if(this.isAnimating == false){
            if(this.counter  % 7 == 0){
                //////AppMobi.webview.execute(" AppMobi.player.playSound('audio/baby2.mp3');");
                //////AppMobi.webview.execute(" AppMobi.player.playSound('audio/"+soundsNumbers[counter]+".mp3');");
                counter = 0;
            }
            xPos = event.pageX || event.touches[0].pageX;
            yPos = event.pageY || event.touches[0].pageY;
            this.isAnimating = true;
           
            this.counter++;
            if(this.mode == 'blankStage'){
                this.mode = 'manEntersStage';
                this.deathTollStart();
                backgroundSounds[0].play();
                baby1.stop();
            }else if(this.mode == 'manEntersStage') {
                if(this.xPos > 340 && this.xPos < 440 && this.yPos > 490 && this.yPos < 824){
                    this.mode = 'manGetsShot';
                    //soundManager.play(soundsNumbers[counter]);
                    //////AppMobi.webview.execute(" AppMobi.player.playSound('audio/"+soundsNumbers[counter]+".mp3');");
                    this.frameCount = 0;
                    this.deathTollSubtract();

                        if(this.backgroundMusicDirection == 'buildUp'){this.backgroundMusic++;}
                        if(this.backgroundMusicDirection == 'buildDown'){this.backgroundMusic--;}
                        if(this.backgroundMusicDirection == 'buildUp' && this.backgroundMusic == 8){ this.backgroundMusicDirection = 'buildDown'; this.backgroundMusic=6;}
                        if(this.backgroundMusicDirection == 'buildDown'  && this.backgroundMusic == -1){ this.backgroundMusicDirection = 'buildUp';this.backgroundMusic = 1;}

                        if(canon9.backgroundMusic == 0){  
                            backgroundSounds[0].play();
                            backgroundSounds[1].stop(); 
                        }
                        if(canon9.backgroundMusic == 1){  
                            backgroundSounds[0].stop();
                            backgroundSounds[1].play();
                            backgroundSounds[2].stop(); 
                        }
                        if(canon9.backgroundMusic == 2){ 
                            backgroundSounds[1].stop();
                            backgroundSounds[2].play();
                            backgroundSounds[3].stop(); 
                        }
                        if(canon9.backgroundMusic == 3){  
                            backgroundSounds[2].stop();
                            backgroundSounds[3].play();
                            backgroundSounds[4].stop(); 
                        }
                        if(canon9.backgroundMusic == 4){  
                            backgroundSounds[3].stop();
                            backgroundSounds[4].play();
                            backgroundSounds[5].stop();  
                        }
                        if(canon9.backgroundMusic == 5){  
                            backgroundSounds[4].stop();
                            backgroundSounds[5].play(); 
                            backgroundSounds[6].stop();
                        }
                        if(canon9.backgroundMusic == 6){  
                            backgroundSounds[5].stop();
                            backgroundSounds[6].play(); 
                            backgroundSounds[7].stop();
                        }
                        if(canon9.backgroundMusic == 7){  
                            backgroundSounds[6].stop();
                            backgroundSounds[7].play(); 
                        }
                }
            }
        } 
    },
    shot: function () {
        var animation_data = [  
            [1724, 714, 285, 364], 
            [1437, 714, 285, 364], 
            [1150, 710, 285, 364], 
            [1150, 710, 285, 364], 
            [1683, 392, 285, 320], 
            [1396, 392, 285, 316], 
            [1396, 392, 285, 316], 
            [1396, 392, 285, 316], 
            [1396, 392, 285, 316], 
            [1109, 392, 285, 288], 
            [287, 122, 285, 234], 
            [1525, 2, 285, 148], 
            [2, 104, 283, 154], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [289, 2, 285, 118], 
            [740, 370, 367, 282], 
            [740, 370, 367, 282], 
            [740, 370, 367, 282], 
            [740, 370, 367, 282], 
            [740, 370, 367, 282], 
            [740, 370, 367, 282], 
            [740, 370, 367, 282], 
            [371, 360, 367, 276], 
            [371, 360, 367, 276], 
            [371, 360, 367, 276], 
            [371, 360, 367, 276], 
            [371, 360, 367, 276], 
            [371, 360, 367, 276], 
            [2, 358, 367, 276], 
            [2, 358, 367, 276], 
            [2, 358, 367, 276], 
            [2, 358, 367, 276], 
            [2, 358, 367, 276], 
            [2, 358, 367, 276], 
            [1284, 152, 333, 238], 
            [1284, 152, 333, 238], 
            [1284, 152, 333, 238], 
            [1284, 152, 333, 238], 
            [1284, 152, 333, 238], 
            [1284, 152, 333, 238], 
            [929, 134, 353, 234], 
            [929, 134, 353, 234], 
            [929, 134, 353, 234], 
            [574, 126, 353, 232], 
            [574, 126, 353, 232], 
            [1619, 152, 375, 238], 
            [1619, 152, 375, 238], 
            [1619, 152, 375, 238], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [1226, 2, 297, 130], 
            [907, 2, 317, 122], 
            [907, 2, 317, 122], 
            [907, 2, 317, 122], 
            [907, 2, 317, 122], 
            [907, 2, 317, 122], 
            [576, 2, 329, 120], 
            [576, 2, 329, 120], 
            [576, 2, 329, 120], 
            [576, 2, 329, 120], 
            [2, 2, 285, 100], 
            [2, 2, 285, 100], 
            [2, 2, 285, 100]
        ];
        ctx.fillStyle= "#000000";
        ctx.fillRect(0,   0, canvasWidth, canvasHeight);
        var frameSizeWidth = animation_data[this.frameCount][2];
        var frameSizeHeight = animation_data[this.frameCount][3];
        var framePosX = animation_data[this.frameCount][0];
        var framePosY = animation_data[this.frameCount][1];
        var canvasDrawX = 230 + (300 - animation_data[this.frameCount][2]);
        var canvasDrawY = 250 + (600 - animation_data[this.frameCount][3]);
        ctx.drawImage(this.sprite_manGettingShot, framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);
        this.frameCount++;
        if(animation_data.length <= this.frameCount){
            this.frameCount = 0;
            this.mode = 'manEntersStage';
        }
    },
    reset:function(){
        this.counter = 1;
        this.isAnimating = false;
        this.frameCount=0;
        this.mode = null;
        this.currentToll = '5734000000';
        this.xPos = -100;
        this.yPos = -100;
        this.sprite_cursor = null;
        this.sprite_manGettingShot = null;
        this.backgroundMusicDirection = 'buildUp';
        this.backgroundMusic = 0;
        this.mouseAlpha = 1;
        this.mouseFadeCounter = 0;

        setTimeout(function(){ canon9.setDeathTollZero(); },200);
        // SOUNDS
        messageThere.fadeOut(0, 250, function(){messageThere.unload();});
        shot.fadeOut(0, 250, function(){shot.unload();});
        baby1.fadeOut(0, 250, function(){baby1.unload();});
        for (var i = 0; i < soundsWordsFiles.length; i++) {
            soundsWords[i].fadeOut(0, 250, function(){soundsWords[i].unload();});
        };

        for (var i = 0; i < soundsBackgroundFiles.length; i++) {
            console.log(i);
            backgroundSounds[i].fadeOut(0, 250, function(){backgroundSounds[i].unload();});
        };
    },
    update:function() 
    {
        this.now = Date.now();
        this.delta = this.now - this.then;
         
        if (this.delta > this.interval) 
        {    
            this.then = this.now - (this.delta % this.interval);
            // ... Code for Drawing the Frame ...
            switch(this.mode) 
            {   
                case 'blankStage':
                    canon9.stage();
                    break;
                case 'manEntersStage':
                    canon9.man();
                    break;
                case 'manGetsShot':
                    canon9.shot();
                    break;
            }            
        }
        this.mouse(this.xPos, this.yPos);
    }
}

