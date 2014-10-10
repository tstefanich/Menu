// Sound variables
var makingconnections1, makingconnections2, makingconnections3, makingconnections4, touchme, frominner, fromouter;

 
var canon2 = {
    fps: 30,
    now: null,
    then: Date.now(),
    interval: null,
    delta: null,
    sprite_blackToWhite: null,
    ssprite_whiteToBlack: null,
    xPos: null,
    yPos: null,
    tapCounter: 1,
    canvasWidth: 768,
    canvasHeight: 1024,
    mode: null,
    isAnimating: false,
    sounds: ['makingconnections1', 'makingconnections2', 'makingconnections3', 'makingconnections4'],
    frameCount: 0,
    whiteToBlack: function () {
        var animation_data = [
            [2, 2012, 20, 22], 
            [2, 1974, 32, 36], 
            [398, 1908, 76, 80], 
            [274, 1908, 122, 118], 
            [274, 1768, 208, 138], 
            [2, 1768, 270, 204], 
            [850, 2, 382, 314], 
            [1470, 1710, 390, 324], 
            [1470, 1362, 418, 346], 
            [1470, 682, 490, 678], 
            [1470, 2, 562, 678], 
            [792, 942, 676, 790], 
            [2, 942, 788, 824], 
            [2, 2, 846, 938]
        ];
         if(animation_data.length <= this.frameCount){
            this.frameCount = 0;
            this.mode = 'black';
            this.isAnimating = false;
            ctx.fillStyle= "#000000";
            ctx.fillRect(0,   0, this.canvasWidth, this.canvasHeight);
         } else {
            var frameSizeWidth = animation_data[this.frameCount][2];
            var frameSizeHeight = animation_data[this.frameCount][3];
            var framePosX = animation_data[this.frameCount][0];
            var framePosY = animation_data[this.frameCount][1];
            var canvasDrawX = this.xPos - animation_data[this.frameCount][2]/2;
            var canvasDrawY = this.yPos - animation_data[this.frameCount][3]/2;
            ctx.drawImage(this.sprite_whiteToBlack, framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);
            this.frameCount++;
         }

    },
    blackToWhite: function () {
        var animation_data = [
            [2, 2012, 20, 22], 
            [2, 1974, 32, 36], 
            [398, 1908, 76, 80], 
            [274, 1908, 122, 118], 
            [274, 1768, 208, 138], 
            [2, 1768, 270, 204], 
            [850, 2, 382, 314], 
            [1470, 1710, 390, 324], 
            [1470, 1362, 418, 346], 
            [1470, 682, 490, 678], 
            [1470, 2, 562, 678], 
            [792, 942, 676, 790], 
            [2, 942, 788, 824], 
            [2, 2, 846, 938]
        ];
        if(animation_data.length <= this.frameCount){
           this.frameCount = 0; 
           this.mode = 'white';
           this.isAnimating = false;
           ctx.fillStyle= "#ffffff";
           ctx.fillRect(0,   0, this.canvasWidth, this.canvasHeight);
        } else {
            var frameSizeWidth = animation_data[this.frameCount][2];
            var frameSizeHeight = animation_data[this.frameCount][3];
            var framePosX = animation_data[this.frameCount][0];
            var framePosY = animation_data[this.frameCount][1];
            var canvasDrawX = this.xPos - animation_data[this.frameCount][2]/2;
            var canvasDrawY = this.yPos - animation_data[this.frameCount][3]/2;
            ctx.drawImage(this.sprite_blackToWhite, framePosX, framePosY, frameSizeWidth, frameSizeHeight, canvasDrawX, canvasDrawY, frameSizeWidth, frameSizeHeight);
            this.frameCount++;
        }
         console.log(canon2.mode);
        
    },
    preloadImages:function ()
    {
        this.sprite_blackToWhite=new Image();
        this.sprite_blackToWhite.src="canons/canon2/img/animation/black/complete.png";

        this.sprite_whiteToBlack=new Image();
        this.sprite_whiteToBlack.src="canons/canon2/img/animation/white/complete.png";
        
        fromouter = new Howl({ urls: [getPhoneGapPath() + 'canons/canon2/audio/fromouter.mp3'], onload: function(){ this.fromouter = true;} }); //new Audio();
        frominner = new Howl({ urls: [getPhoneGapPath() + 'canons/canon2/audio/frominner.mp3'], onload: function(){ this.frominner = true;} }); //new Audio();
        touchme = new Howl({ urls: [getPhoneGapPath() + 'canons/canon2/audio/touchme.mp3'], onload: function(){ this.touchme = true;} }); //new Audio();

        makingconnections1 = new Howl({ urls: [getPhoneGapPath() + 'canons/canon2/audio/makingconnections1.mp3'], onload: function(){ this.makingconnections1 = true;} }); //new Audio();
        makingconnections1.play();
        makingconnections2 = new Howl({ urls: [getPhoneGapPath() + 'canons/canon2/audio/makingconnections2.mp3'], loop: true, onload: function(){ this.makingconnections2 = true;} }); //new Audio();
        makingconnections3 = new Howl({ urls: [getPhoneGapPath() + 'canons/canon2/audio/makingconnections3.mp3'], loop: true, onload: function(){ this.makingconnections3 = true;} }); //new Audio();
        makingconnections4 = new Howl({ urls: [getPhoneGapPath() + 'canons/canon2/audio/makingconnections4.mp3'], loop: true, onload: function(){ this.makingconnections4 = true;} }); //new Audio();

        
    },
    setup:function ()
    {   
        this.mode = 'black';
        this.interval = 1000/this.fps;
        ctx.fillStyle= "#000000";
        ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);
        this.preloadImages();
        touchme.play();
        draw();
    },
    reset:function(){
        this.sprite_blackToWhite= null;
        this.ssprite_whiteToBlack= null;
        this.xPos= null;
        this.yPos= null;
        this.tapCounter= 1;
        this.mode= null;
        this.isAnimating=false;
        this.frameCount=0;

        makingconnections1.fadeOut(0, 250, function(){makingconnections1.unload();});
        makingconnections2.fadeOut(0, 250, function(){makingconnections2.unload();});
        makingconnections3.fadeOut(0, 250, function(){makingconnections3.unload();});
        makingconnections4.fadeOut(0, 250, function(){makingconnections4.unload();});

    },
    update:function () 
    {
 
        this.now = Date.now();
        this.delta = this.now - this.then;
         
        if (this.delta > this.interval) 
        {    
            
            //console.log('drawing');
            this.then = this.now - (this.delta % this.interval);
            // ... Code for Drawing the Frame ...
            switch(this.mode) 
            {   
                case 'white':
                    break;
                case 'black':
                    break;
                case 'blackToWhite':
                    this.blackToWhite();
                    break;
                case 'whiteToBlack':
                    this.whiteToBlack();
                    break;
            }
        }
    },
    touchStart:function(){
        if(this.tapCounter == 5){
            this.tapCounter = 1;
        }
         
        if(this.tapCounter == 1){
            makingconnections3.pause();
            makingconnections1.play();
        } else if(this.tapCounter == 2){
            makingconnections1.pause();
            makingconnections2.play();
        } else if(this.tapCounter == 3){
            makingconnections2.pause();
            makingconnections4.play();
        } else if(this.tapCounter == 4){
            makingconnections4.pause();
            makingconnections3.play();
        } else {}
        this.tapCounter++;
       
        //var randomSound = Math.floor(sounds.length * Math.random()); 
        //AppMobi.webview.execute(" AppMobi.player.playSound('audio/"+randomSound+".mp3');");

        if(this.mode == 'white'){
            ctx.fillStyle= "#ffffff";
            ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);
            this.xPos=event.pageX || event.touches[0].pageX;
            this.yPos=event.pageY || event.touches[0].pageY;   
            fromouter.stop();
            frominner.play();
             console.log('white');
            this.mode = 'whiteToBlack'; 

        }else if(this.mode == 'black') {

            ctx.fillStyle= "#000000";
            ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);
            this.xPos=event.pageX || event.touches[0].pageX;
            this.yPos=event.pageY || event.touches[0].pageY;   
            frominner.stop();
            fromouter.play();
           
            this.mode = 'blackToWhite';
             console.log(canon2.mode);
        };  
                   
    }
}


