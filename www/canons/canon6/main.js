/***************************/
/* Sound Component for web */
/***************************/


// forecolor 255 is rgb(0),  rgb(0) is also white at .0
// forecolor 254 is rgb(17),  rgb(18) is also white at .7
// forecolor 253 is rgb(34),  rgb(36) is also white at .14
// forecolor 252 is rgb(68),  rgb(69) is also white at .27
// forecolor 251 is rgb(85),  rgb(84) is also white at .33
// forecolor 250 is rgb(119), rgb(120) is also white at .47
// forecolor 249 is rgb(135), rgb(136) is also white at .53
// forecolor 248 is rgb(170), rgb(171) is also white at .67  
// forecolor 247 is rgb(187), rgb(186) is also white at .73
// forecolor 246 is rgb(221), rgb(222) is also white at .87 
// forecolor 245 is rgb(238), rgb(237) is also white at .93
// forecolor 244 is rgb(244), rgb(245) is also white at .96
// forecolor 243 is rgb(243), rgb(242) is also white at .95

// CANON 6 SOUNDS 

//function getPhoneGapPath(){
//
//    return '';
//}


var dogBarks, dogBarksBaby, massesEcho, peopleSendOutSignals;


function fadeInVolume(_audio, _rate, callback)
{
    var audio = _audio;
    var rate = _rate; 
    //console.log(rate);
    var factor  = 1/rate;
     //console.log(factor);
    if (1 > factor)
    {
        setTimeout(function(){
            audio.volume += factor;
            fadeInVolume(audio,rate, callback);         
        }, 10);
    } else {
        (typeof(callback) !== 'function') || callback();
    }
}


function pad(n) {
    if (n < 10)
        return "0" + n;
    return n;
}

/********************/
/* Global Variables */
/********************/



var canon6 = {
    cursor:0,
    teresaStart: [{x:142,y:154},{x:148,y:160},{x:148,y:160},{x:148,y:160},{x:148,y:160},{x:148,y:160},{x:148,y:160},{x:148,y:160},{x:148,y:160},{x:148,y:160}],
    teresaRegPoints: [{x:40,y:-14},{x:66,y:109},{x:40,y:40},{x:58,y:106},{x:96,y:124},{x:87,y:130},{x:105,y:132},{x:105,y:130},{x:105,y:132},{x:105,y:132}],
    houseImages:[],
    houseNum:0,
    teresaImages:[],
    teresaImagesBW:[],
    mode2:'none',
    maoStart: [{x:142,y:154},{x:142,y:154},{x:142,y:154},{x:142,y:154},{x:142,y:154},{x:142,y:154},{x:142,y:154},{x:142,y:154},{x:142,y:154},{x:142,y:154}],
    maoRegPoints: [{x:-66,y:-78},{x:37,y:76},{x:66,y:123},{x:37,y:129},{x:63,y:117},{x:60,y:123},{x:96,y:129},{x:86,y:129},{x:99,y:129},{x:99,y:129}],
    maoImages:[],
    clickCount: 0,
    clickCountReset:false,
    maoImagesBW:[],
    count3:1,
    count3Alpha:0,
    count4:1,
    count4Alpha:0,
    count5:9,
    count5Alpha:0,
    count6:11,
    count6Alpha:0,
    count7:7,
    count7Alpha:0,
    count8:35,
    count8Alpha:0,
    count9:35,
    count9Alpha:0,
    count10:35,
    count10Alpha:0,
    count11:10,
    count11Alpha:0,
    count12:1,
    count12Alpha:0,
    count13:10,
    count13Alpha:0,
    portraitFrame:0,
    offsetX:50,
    offsetY:60,

    sprite_is_the: null,
    sprite_intro_sentence: null,
    sprite_ripple: null,
    fps: 8,
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
    xPos: 0,
    yPos: 0,
    go: false,
    sizeC: 76,
    dx: 0,
    dy: 0,
    offset: 5.5,
    mode: 'start',
    frameCount:0,
    countDown:function(){
        if(this.clickCount > 9){
            this.clickCountReset = true;
        }

        if(this.clickCountReset == true){
            this.clickCount--;
        }

        if(this.clickCount == 0 && this.clickCountReset == true){
            this.clickCountReset =false;
            this.mode2='none';
        }
    },
    update:function(){
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta > this.interval) 
        {    
            this.then = this.now - (this.delta % this.interval);
            // ... Code for Drawing the Frame ...
            ctx.fillStyle = '#000';
            ctx.fillRect(0 ,0, canvasWidth,canvasHeight);

            switch(this.mode){
                case 'start':
                    this.house();
                    this.pulse3();
                    this.pulse4();
                    this.pulse5();
                    this.pulse6();
                    this.pulse7();
                    this.pulse8();
                    this.pulse9();
                    this.pulse10();
                    this.pulse11();
                    this.pulse12();
                    this.pulse13();
                    this.countDown();

                   
                    this.touchMove();
                    break;
            }
            this.frameCount++;
        }
    },
    house:function(){
        ctx.save();
        ctx.scale(this.rs,this.rs);
        ctx.translate(20,5);
        ctx.drawImage(this.houseImages[this.houseNum],200/this.rs,775/this.rs); 
        ctx.restore();
    },
    setPortraitAlpha:function(frame){
        if(frame == 9){
            ctx.globalAlpha = this.count3Alpha;
        }
        if(frame == 8){
            ctx.globalAlpha = this.count4Alpha;
        }
        if(frame == 7){
            ctx.globalAlpha = this.count5Alpha;
        }
        if(frame == 6){
            ctx.globalAlpha = this.count6Alpha;
        }
        if(frame == 5){
            ctx.globalAlpha = this.count7Alpha;
        }
        if(frame == 4){
            ctx.globalAlpha = this.count8Alpha;
        }
        if(frame == 3){
            ctx.globalAlpha = this.count9Alpha;
        }
        if(frame == 2){
            ctx.globalAlpha = this.count10Alpha;
        }
        if(frame == 1){
            ctx.globalAlpha = this.count11Alpha;
        }
    },
    drawPortrait:function(frame){
        if(this.mode2 == 'teresa'){
            this.drawPortraitTeresa(frame);
        } else if(this.mode2 == 'mao'){
            this.drawPortraitMao(frame);
        }
    },
    drawPortraitTeresa:function(frame,alpha){
        ctx.save();
        ctx.scale(this.rs,this.rs);
        ctx.translate(20,5);
       
        var newPosX = this.teresaStart[frame].x - this.teresaRegPoints[frame].x;
        var newPosY = this.teresaStart[frame].y - this.teresaRegPoints[frame].y;
        //console.log(this.teresaImages[frame].width);
        ctx.drawImage(this.teresaImagesBW[frame],newPosX,newPosY); // BLACK VERSION OF IMAGE FIRST
        if(frame == 0){
            ctx.globalAlpha =this.count12Alpha;
        } else {
            this.setPortraitAlpha(frame);
        }
        ctx.drawImage(this.teresaImages[frame],newPosX,newPosY);
        ctx.restore();
    },
     drawPortraitMao:function(frame,alpha){
        ctx.save();
        ctx.scale(this.rs,this.rs);
        ctx.translate(20,5);
       
        var newPosX = this.maoStart[frame].x - this.maoRegPoints[frame].x;
        var newPosY = this.maoStart[frame].y - this.maoRegPoints[frame].y;
        ctx.drawImage(this.maoImagesBW[frame],newPosX,newPosY); 
         if(frame == 0){
            ctx.globalAlpha =this.count13Alpha;
        } else {
            this.setPortraitAlpha(frame);
        }
        ctx.drawImage(this.maoImages[frame],newPosX,newPosY);
        ctx.restore();
    },
    pulse3:function(){
        if(this.clickCount < 9){return;}
        if(this.mode2 == 'teresa'){
            this.houseNum = 1;
        } else if(this.mode2 == 'mao'){
            this.houseNum = 0;

        }
        this.count3++;
        if(this.count3 > 78){ this.count3 = 1; }
        if(this.count3 == 1){
            this.count3Alpha = .73; 
        }
        if(this.count3 == 12){
            this.count3Alpha = .87;
        }
        if(this.count3 == 23){
            this.count3Alpha = .93;
        }
        if(this.count3 == 34){
            this.count3Alpha = 1;
        }
        if(this.count3 == 45){
            this.count3Alpha = .93;
        }
        if(this.count3 == 56){
            this.count3Alpha = .87;
        }
        if(this.count3 == 67){
            this.count3Alpha = .73;
        }      



        this.drawPortrait(9);  
      
    },
    pulse4:function(){
        if(this.clickCount < 8){return;}
        this.count4++;
        if(this.count4 > 60){ this.count4 = 1; }
        if(this.count4 == 1){
            this.count4Alpha = .53;
        }
        if(this.count4 == 5){
            this.count4Alpha = .67;
        }
        if(this.count4 == 10){
            this.count4Alpha = .73;
        }
        if(this.count4 == 15){
            this.count4Alpha = .87;
        }
        if(this.count4 == 20){
            this.count4Alpha = .93;
        }
        if(this.count4 == 25){
            this.count4Alpha = 1;
        }
        if(this.count4 == 30){
            this.count4Alpha = .93;
        }
        if(this.count4 == 35){
            this.count4Alpha = .87;
        }
        if(this.count4 == 40){
            this.count4Alpha = .73;
        }
        if(this.count4 == 45){
            this.count4Alpha = .67;
        }
        if(this.count4 == 50){
            this.count4Alpha = .53;
        }
        this.drawPortrait(8);  

    },
    pulse5:function(){
        if(this.clickCount < 7){return;}
        this.count5++;
        if (this.count5>29 ){ this.count5 = 1;}
        if (this.count5 == 1){
          this.count5Alpha = .07;
        }
        if (this.count5 == 2){
          this.count5Alpha = .27;
        }
        if (this.count5 == 3){
          this.count5Alpha = .33;
        }
        if (this.count5 == 4){
          this.count5Alpha = .47;
        }
        if (this.count5 == 5){
          this.count5Alpha = .53;
        }
        if (this.count5 == 6){
          this.count5Alpha = .67;
        }
        if (this.count5 == 7){
          this.count5Alpha = .73;
        }
        if (this.count5 == 8){
          this.count5Alpha = .87;
        }
        if (this.count5 == 9){
          this.count5Alpha = .93;
        }
        if (this.count5 == 10){
          this.count5Alpha = 1;
        }
        if (this.count5 == 28){
          this.count5Alpha = .27;
        }
        if (this.count5 == 27){
          this.count5Alpha = .33;
        }
        if (this.count5 == 26){
          this.count5Alpha = .47;
        }
        if (this.count5 == 25){
          this.count5Alpha = .53;
        }
        if (this.count5 == 24){
          this.count5Alpha = .67;
        }
        if (this.count5 == 23){
          this.count5Alpha = .73;
        }
        if (this.count5 == 22){
          this.count5Alpha = .87;
        }
        if (this.count5 == 21){
          this.count5Alpha = .93;
        }
        
        this.drawPortrait(7);  

    },
    pulse6:function(){
        if(this.clickCount < 6){return;}
        this.count6++;
        if(this.count6>29){
          this.count6 = 1;
        }
        if(this.count6 == 1){
           this.count6Alpha = .07;
        }
        if(this.count6 == 2){
           this.count6Alpha = .27;
        }
        if(this.count6 == 3){
           this.count6Alpha = .33;
        }
        if(this.count6 == 4){
           this.count6Alpha = .47;//set the forecolor of sprite (6) to 250
        }
        if(this.count6 == 5){
           this.count6Alpha = .53;
        }
        if(this.count6 == 6){
           this.count6Alpha = .67;
        }
        if(this.count6 == 7){
           this.count6Alpha = .73;
        }
        if(this.count6 == 8){
            this.count6Alpha = .87;
        }
        if(this.count6 == 9){
            this.count6Alpha = .93;
        }
        if(this.count6 == 10){
            this.count6Alpha = 1;
        }
        if(this.count6 == 28){
          this.count6Alpha = .27;
        }
        if(this.count6 == 27){
          this.count6Alpha = .33;
        }
        if(this.count6 == 26){
           this.count6Alpha = .47;
        }
        if(this.count6 == 25){
           this.count6Alpha = .53;
        }
        if(this.count6 == 24){
           this.count6Alpha = .67;
        }
        if(this.count6 == 23){
           this.count6Alpha = .73;
        }
        if(this.count6 == 22){
           this.count6Alpha = .87;
        }
        if(this.count6 == 21){
           this.count6Alpha = .93;
        }
        this.drawPortrait(6);
    },
    pulse7:function(){
        if(this.clickCount < 5){return;}
        this.count7++;
        if(this.count7>29){
          this.count7 = 1;
        }
        if(this.count7 == 1){
          this.count7Alpha = .07;
        }
        if(this.count7 == 2){
          this.count7Alpha = .27;
        }
        if(this.count7 == 3){
          this.count7Alpha = .33;
        }
        if(this.count7 == 4){
          this.count7Alpha = .47;
        }
        if(this.count7 == 5){
          this.count7Alpha = .53;
        }
        if(this.count7 == 6){
          this.count7Alpha = .67;
        }
        if(this.count7 == 7){
          this.count7Alpha = .73;
        }
        if(this.count7 == 8){
          this.count7Alpha = .87;
        }
        if(this.count7 == 9){
          this.count7Alpha = .93;
        }
        if(this.count7 == 10){
          this.count7Alpha = 1;
        }
        if(this.count7 == 28){
          this.count7Alpha = .27;
        }
        if(this.count7 == 27){
          this.count7Alpha = .33;
        }
        if(this.count7 == 26){
          this.count7Alpha = .47;
        }
        if(this.count7 == 25){
          this.count7Alpha = .53;
        }
        if(this.count7 == 24){
          this.count7Alpha = .67;
        }
        if(this.count7 == 23){
          this.count7Alpha = .73;
        }
        if(this.count7 == 22){
          this.count7Alpha = .87;
        }
        if(this.count7 == 21){
          this.count7Alpha = .93;
        }
        this.drawPortrait(5);
      },
    pulse8:function(){
        if(this.clickCount < 4){return;}
        this.count8++;
        if(this.count8>60){
          this.count8 = 1;
        }
        if(this.count8 == 1){
            this.count8Alpha =.53;
        }
        if(this.count8 == 5){
            this.count8Alpha =.67;
        }
        if(this.count8 == 10){
            this.count8Alpha =.73;

        }
        if(this.count8 == 15){
           this.count8Alpha =.87;
        }
        if(this.count8 == 20){
            this.count8Alpha =.93;
        }
        if(this.count8 == 25){
          this.count8Alpha = 1;
        }
        if(this.count8 == 30){
            this.count8Alpha =.93;
        }
        if(this.count8 == 35){
           this.count8Alpha =.87;
        }
        if(this.count8 == 40){
            this.count8Alpha =.73;
        }
        if(this.count8 == 45){
            this.count8Alpha =.67;
        }
        if(this.count8 == 50){
            this.count8Alpha =.53;
        }
        this.drawPortrait(4);
        
    },
    pulse9:function(){
        if(this.clickCount < 3){return;}
        this.count9++;
        if(this.count9>39){
          this.count9 = 1;
        }
        if(this.count9 == 1){
            this.count9Alpha = .07;
        }
        if(this.count9 == 2){
            this.count9Alpha = .27;
        }
        if(this.count9 == 3){
            this.count9Alpha = .33;
        }
        if(this.count9 == 4){
            this.count9Alpha = .47;
        }
        if(this.count9 == 5){
            this.count9Alpha = .53;
        }
        if(this.count9 == 6){
            this.count9Alpha = .67;
        }
        if(this.count9 == 7){
            this.count9Alpha = .73;
        }
        if(this.count9 == 8){
            this.count9Alpha = .87;
        }
        if(this.count9 == 9){
            this.count9Alpha = .93;
        }
        if(this.count9 == 10){
            this.count9Alpha = 1;
        }
        if(this.count9 == 38){
            this.count9Alpha = .27;
        }
        if(this.count9 == 37){
            this.count9Alpha = .33;
        }
        if(this.count9 == 36){
            this.count9Alpha = .47;
        }
        if(this.count9 == 35){
            this.count9Alpha = .53;
        }
        if(this.count9 == 34){
            this.count9Alpha = .67;
        }
        if(this.count9 == 33){
            this.count9Alpha = .73;
        }
        if(this.count9 == 32){
            this.count9Alpha = .87;
        }
        if(this.count9 == 31){
            this.count9Alpha = .93;
        }
        this.drawPortrait(3);
        
    },
    pulse10:function(){
        if(this.clickCount < 2){return;}
        this.count10++;
        if(this.count10>72){
          this.count10 = 1;
        }
        if(this.count10 == 1){
            this.count10Alpha = .07;
        }
        if(this.count10 == 4){
          this.count10Alpha = .27;
        }
        if(this.count10 == 8){
          this.count10Alpha = .33;
        }
        if(this.count10 == 12){
          this.count10Alpha = .47;
        }
        if(this.count10 == 16){
          this.count10Alpha = .53;
        }
        if(this.count10 == 20){
          this.count10Alpha = .67;
        }
        if(this.count10 == 24){
          this.count10Alpha = .73;
        }
        if(this.count10 == 28){
          this.count10Alpha = .87;
        }
        if(this.count10 == 32){
          this.count10Alpha = .93;
        }
        if(this.count10 == 36){
          this.count10Alpha = 1;
        }
        if(this.count10 == 68){
          this.count10Alpha = .27;
        }
        if(this.count10 == 64){
          this.count10Alpha = .33;
        }
        if(this.count10 == 60){
          this.count10Alpha = .47;
        }
        if(this.count10 == 56){
          this.count10Alpha = .53;
        }
        if(this.count10 == 52){
          this.count10Alpha = .67;
        }
        if(this.count10 == 48){
          this.count10Alpha = .73;
        }
        if(this.count10 == 44){
          this.count10Alpha = .87;
        }
        if(this.count10 == 40){
          this.count10Alpha = .93;
        }
        this.drawPortrait(2);
        
    },
    pulse11:function(){
        if(this.clickCount < 1){return;}
        this.count11++; 
        if(this.count11>38){
          this.count11 = 1;
        }
        if(this.count11 == 2){
            this.count11Alpha = .07;
        }
        if(this.count11 == 4){
            this.count11Alpha = .27;
        }
        if(this.count11 == 6){
            this.count11Alpha = .33;
        }
        if(this.count11 == 8){
            this.count11Alpha = .47;
        }
        if(this.count11 == 10){
            this.count11Alpha = .53;
        }
        if(this.count11 == 12){
            this.count11Alpha = .67;
        }
        if(this.count11 == 14){
            this.count11Alpha = .73;
        }
        if(this.count11 == 16){
            this.count11Alpha = .87;
        }
        if(this.count11 == 18){
            this.count11Alpha = .93;
        }
        if(this.count11 == 20){
            this.count11Alpha = 1;
        }
        if(this.count11 == 36){
            this.count11Alpha = .27;
        }
        if(this.count11 == 34){
            this.count11Alpha = .33;
        }
        if(this.count11 == 32){
            this.count11Alpha = .47;
        }
        if(this.count11 == 30){
            this.count11Alpha = .53;
        }
        if(this.count11 == 28){
            this.count11Alpha = .67;
        }
        if(this.count11 == 26){
            this.count11Alpha = .73;
        }
        if(this.count11 == 24){
            this.count11Alpha = .87;
        }
        if(this.count11 == 22){
            this.count11Alpha = .93;
         }
        this.drawPortrait(1);
        
    },
    pulse12:function(){
        //if(this.clickCount < 0-1){return;}
        this.count12++;
        if(this.count12>29){
          this.count12 = 1;
        }
        if(this.count12 == 1){
            this.count12Alpha = .07;
        }
        if(this.count12 == 2){
            this.count12Alpha = .27;
        }
        if(this.count12 == 3){
            this.count12Alpha = .33;
        }
        if(this.count12 == 4){
            this.count12Alpha = .47;
        }
        if(this.count12 == 5){
            this.count12Alpha = .53;
        }
        if(this.count12 == 6){
            this.count12Alpha = .67;
        }
        if(this.count12 == 7){
            this.count12Alpha = .73;
        }
        if(this.count12 == 8){
            this.count12Alpha = .87;
        }
        if(this.count12 == 9){
            this.count12Alpha = .93;
        }
        if(this.count12 == 10){
            this.count12Alpha = 1;
        }
        if(this.count12 == 28){
            this.count12Alpha = .27;
        }
        if(this.count12 == 27){
            this.count12Alpha = .33;
        }
        if(this.count12 == 26){
            this.count12Alpha = .47;
        }
        if(this.count12 == 25){
            this.count12Alpha = .53;
        }
        if(this.count12 == 24){
            this.count12Alpha = .67;
        }
        if(this.count12 == 23){
            this.count12Alpha = .73;
        }
        if(this.count12 == 22){
            this.count12Alpha = .87;
        }
        if(this.count12 == 21){
            this.count12Alpha = .93;
        }
        this.drawPortraitMao(0, this.count12Alpha);
    },
    pulse13:function(){
        //if(this.clickCount < 0){return;}
        this.count13++;
        if(this.count13>29){
          this.count13 = 1;
        }
        if(this.count13 == 1){
            this.count13Alpha = .07;
        }
        if(this.count13 == 2){
            this.count13Alpha = .27;
        }
        if(this.count13 == 3){
            this.count13Alpha = .33;
        }
        if(this.count13 == 4){
            this.count13Alpha = .47;
        }
        if(this.count13 == 5){
            this.count13Alpha = .53;
        }
        if(this.count13 == 6){
            this.count13Alpha = .67;
        }
        if(this.count13 == 7){
            this.count13Alpha = .73;
        }
        if(this.count13 == 8){
            this.count13Alpha = .87;
        }
        if(this.count13 == 9){
            this.count13Alpha = .93;
        }
        if(this.count13 == 10){
            this.count13Alpha = 1;
        }
        if(this.count13 == 28){
            this.count13Alpha = .27;
        }
        if(this.count13 == 27){
            this.count13Alpha = .33;
        }
        if(this.count13 == 26){
            this.count13Alpha = .47;
        }
        if(this.count13 == 25){
            this.count13Alpha = .53;
        }
        if(this.count13 == 24){
            this.count13Alpha = .67;
        }
        if(this.count13 == 23){
            this.count13Alpha = .73;
        }
        if(this.count13 == 22){
            this.count13Alpha = .87;
        }
        if(this.count13 == 21){
            this.count13Alpha = .93;
        }
        this.drawPortraitTeresa(0,this.count13Alpha);
    },
    preloadImages:function(){
        // House
        for (i = 0; i <= 1; i++) {
            var imageNum = i;
            this.houseImages[i] = new Image();
            this.houseImages[i].src = 'canons/canon6/img/house'+imageNum+'.png';
        }
        

        // Preload Teresa
        for (i = 0; i <= 9; i++) {
            var imageNum = i;
            this.teresaImages[i] = new Image();
            this.teresaImages[i].src = 'canons/canon6/img/teresa/teresa-'+imageNum+'.gif';
        }

        for (i = 0; i <= 9; i++) {
            var imageNum = i;
            this.teresaImagesBW[i] = new Image();
            this.teresaImagesBW[i].src = 'canons/canon6/img/teresa-bw/teresa-'+imageNum+'.gif';
        }
        

        // Mao
        for (i = 0; i <=9; i++) {
            var imageNum = i;
            this.maoImages[i] = new Image();
            this.maoImages[i].src = 'canons/canon6/img/mao/mao-'+imageNum+'.gif';
        }
        
        for (i = 0; i <=9; i++) {
            var imageNum = i;
            this.maoImagesBW[i] = new Image();
            this.maoImagesBW[i].src = 'canons/canon6/img/mao-bw/mao-'+imageNum+'.gif';
        }
        
        //this.sprite_cursor = new Image();
        //this.sprite_cursor.src = 'canons/canon6/img/mao-bw/'

       
        

    },
    setup:function(){
        this.mode = 'start';
        this.interval = 1000/this.fps;
        ctx.globalCompositeOperation="source-over";
        ctx.fillStyle = "#000";
        ctx.fillRect(0,   0, canvasWidth,canvasHeight);
        this.preloadImages();

        dogBarksBaby = new Howl({ urls: [getPhoneGapPath() + 'canons/canon6/audio/dogsdustbaby2.mp3'], loop: true, onload: function(){ } }); //new Audio();
        dogBarksBaby.volume(1);       
        dogBarksBaby.play();

        massesEcho = new Howl({ urls: [getPhoneGapPath() + 'canons/canon6/audio/massesecho.mp3'], onend: function(){ } }); //new Audio();


        peopleSendOutSignals = new Howl({ urls: [getPhoneGapPath() + 'canons/canon6/audio/peoplesendoutsignals.mp3'], onend: function(){ } }); //new Audio();

        dogBarks = new Howl({ urls: [getPhoneGapPath() + 'canons/canon6/audio/dogsdust.mp3'], loop: true, onend: function(){ } }); //new Audio();
        dogBarks.volume(0); 
        dogBarks.play();


    },
    reset:function(){
        dogBarks.fadeOut(0, 250, function(){dogBarks.unload();});
        peopleSendOutSignals.fadeOut(0, 250, function(){peopleSendOutSignals.unload();});
        massesEcho.fadeOut(0, 250, function(){massesEcho.unload();});
        dogBarksBaby.fadeOut(0, 250, function(){dogBarksBaby.unload();});

        this.mode = 'nothing';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0 ,0, canvasWidth,canvasHeight);
        this.dx = 0;
        this.dy = 0;
        this.go = false;
        this.maskHeight = 0;
        this.reath = false;
        this.topHeadTouch = false;
        this.bottomHeadTouch = false;
        this.pulsesComplete = false;


        // break;
        
    },
    touchStart:function(event){
       this.xPos = event.clientX;
       this.yPos = event.clientY;
       var mouseH = event.clientX;
       var mouseV = event.clientY;
       // EYEBALL

        // Hit areas 92,  163 21 21
        // Hit areas 200, 224 17 17
        if(this.clickCount == 0){
            dogBarksBaby.volume(0);
            dogBarks.volume(1);

        }

        if(this.clickCount == 8){
            dogBarks.volume(0);
            dogBarksBaby.volume(1);
            massesEcho.play();
        }

        
        //console.log(this.clickCount);
        if(this.mode2 == 'none'){
            if( this.xPos > (92)*this.rs+20 && this.xPos < (133)*this.rs+20 && this.yPos > (163)*this.rs+5 && this.yPos < (204)*this.rs+5){
                if(this.clickCount == 0){
                    this.mode2 = 'teresa';
                    this.clickCount++;
                } 
            } else if (this.xPos > (200)*this.rs+20 && this.xPos < (237)*this.rs+20 && this.yPos > (224)*this.rs+5 && this.yPos < (261)*this.rs+5){
                if(this.clickCount == 0){
                    this.mode2 = 'mao';
                    this.clickCount++;
                } 
            }
       } else {
            if( this.xPos > 160 && this.xPos < 570 && this.yPos > 120 && this.yPos < 600){
                this.clickCount++;
            }

       }
       
       if( this.xPos > 313 && this.xPos < 468 && this.yPos > 815 && this.yPos < 911){
            if(peopleSendOutSignals.duration > 0 && !peopleSendOutSignals.paused){

                //already playing
                peopleSendOutSignals.pause();
                peopleSendOutSignals.currentTime = 0;
                peopleSendOutSignals.play();

            }else{

                //not playing
                peopleSendOutSignals.play();    

            }
       }


   //
    },
    mask:function(){

    },
    touchMove:function(event){
        var mouseH = this.xPos;
        var mouseV = this.yPos;
        var rs = this.rs;
        var offsetX = this.offsetX;
        var offsetY = this.offsetY;
      
    },
    mouse: function(xPos, yPos){
        ctx.save();
        ctx.globalAlpha = this.mouseAlpha;
        ctx.drawImage(sprite_cursor, xPos-40, yPos-82, 79, 82);
        ctx.restore();
        if(this.mouseFadeCounter >= 60){
            //c*(t*t*t*t*t + 1) + b
            this.mouseAlpha = Math.max(0, ((60-this.mouseFadeCounter)/10)+1);
            //console.log(this.mouseAlpha);
              
        }
        this.mouseFadeCounter++;
       

    },
}

    
/******************/
/*      Draw      */
/******************/








