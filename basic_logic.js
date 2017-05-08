import React from 'react';
import ReactDOM from 'react-dom';
import {ScoreBoard} from './render_ui';
import Animate from './animate';



const utilDrawing = class {

    static drawBoard(tetrisInstance,flag) {

        for(let i=0; i<400; i+=25) {
            /*
            canvas board 400 X 500 (16 X 20) 실제로는 18X22인데 블럭이들어가는 판크기는 16X20
             */
            ctx.moveTo(i,0);
            ctx.lineTo(i,500);
        }

        for(let i=0; i<500; i+=25) {
            ctx.moveTo(0,i);
            ctx.lineTo(400,i);
        }

        ctx.moveTo(400,0);
        ctx.lineTo(400,500);
        ctx.moveTo(0,500);
        ctx.lineTo(400,500);

        ctx.stroke();

        if(!flag)
            tetrisInstance.img = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
    }
}


const Tetris = (() => {
    let blocks = Symbol.for('Eat2go');
    const BLOCKWIDTH = 25,
          BLOCKHEIGHT = 25;


    return class {
        constructor() {
            this[blocks] = { 
                // increaseX[0] 은 블럭이생성될때 초기X좌표임.
                // 회전시킬수있는 블럭은 모두 오른쪽으로 회전한다.
                one : {
                    increaseX : [100,BLOCKWIDTH,BLOCKWIDTH,BLOCKWIDTH],
                    increaseY : [0,0,0,0],
                    flag : 1,
                    ref : 'one',
                    rotation : {
                        two : {
                            increaseX : [100,0,0,0],
                            increaseY : [0,BLOCKWIDTH,BLOCKWIDTH,BLOCKWIDTH],
                            flag : 2,
                            ref : 'one'
                        }
                    }
                },
                two : {
                    increaseX : [100,0,BLOCKWIDTH,BLOCKWIDTH],
                    increaseY : [0,BLOCKHEIGHT,0,0],
                    flag : 1,
                    ref : 'two',
                    rotation : {
                        two : {
                            increaseX : [100,0,0,BLOCKWIDTH],
                            increaseY : [0,BLOCKWIDTH,BLOCKWIDTH,-BLOCKWIDTH*2],
                            flag : 2,
                            ref : 'two'
                        }, 
                        three : {
                            increaseX : [100,BLOCKWIDTH,BLOCKWIDTH,0],
                            increaseY : [0,0,0,BLOCKWIDTH],
                            flag : 3,
                            ref : 'two'
                        },
                        four : {
                            increaseX : [100,BLOCKWIDTH,0,0],
                            increaseY : [0,0,-BLOCKWIDTH,-BLOCKWIDTH],
                            flag : 4,
                            ref : 'two'
                        }
                    }
                },
                // three , five , six 는 처음에 블럭그릴떄 임의로 시작Y에 25를 더해야된다.
                three : {
                    increaseX : [100,BLOCKWIDTH,BLOCKWIDTH,0],
                    increaseY : [0,0,0,-BLOCKHEIGHT],
                    flag : 1,
                    ref : 'three', 
                    rotation : {
                        two : {
                            increaseX : [100,0,0,BLOCKWIDTH],
                            increaseY : [0,BLOCKWIDTH,BLOCKWIDTH,0],
                            flag : 2,
                            ref : 'three'
                        },
                        three : {
                            increaseX : [100,BLOCKWIDTH,BLOCKWIDTH,-BLOCKWIDTH*2],
                            increaseY : [0,0,0,BLOCKWIDTH],
                            flag : 3,
                            ref : 'three'
                        },
                        four : {
                            increaseX : [100,BLOCKWIDTH,0,0],
                            increaseY : [0,0,BLOCKWIDTH,BLOCKWIDTH],
                            flag : 4,
                            ref : 'three'
                        }
                    }   
                },
                four : {
                    increaseX : [100,0,BLOCKWIDTH,0],
                    increaseY : [0,BLOCKHEIGHT,0,-BLOCKHEIGHT],
                    flag : 1,
                    ref : 'four',
                    rotation : {

                    }
                },
                five : {
                    increaseX : [100,BLOCKWIDTH,0,BLOCKWIDTH],
                    increaseY : [0,0,-BLOCKWIDTH,0],
                    flag : 1,
                    ref : 'five',
                    rotation : {
                        two : {
                            increaseX : [100,0,BLOCKWIDTH,0],
                            increaseY : [0,BLOCKWIDTH,0,BLOCKWIDTH],
                            flag : 2,
                            ref : 'five'
                        }
                    }
                },
                six : {
                    increaseX : [100,BLOCKWIDTH,BLOCKWIDTH,-BLOCKWIDTH],
                    increaseY : [0,0,0,-BLOCKHEIGHT],
                    flag : 1,
                    ref : 'six',
                    rotation : {
                        two : {
                            increaseX : [100,0,0,BLOCKWIDTH],
                            increaseY : [0,BLOCKWIDTH,BLOCKWIDTH,-BLOCKWIDTH],
                            flag : 2,
                            ref : 'six'
                        },
                        three : {
                            increaseX : [100,BLOCKWIDTH,BLOCKWIDTH,-BLOCKWIDTH],
                            increaseY : [0,0,0,BLOCKWIDTH],
                            flag : 3,
                            ref : 'six'
                        },
                        four : {
                            increaseX : [100,BLOCKWIDTH,0,0],
                            increaseY : [0,-BLOCKWIDTH,BLOCKWIDTH,BLOCKWIDTH],
                            flag : 4,
                            ref : 'six'
                        }
                    }
                },
                seven : {
                    increaseX : [100,BLOCKWIDTH,0,BLOCKWIDTH],
                    increaseY : [0,0,BLOCKWIDTH,0],
                    flag : 1,
                    ref : 'seven',
                    rotation : {
                        two : {
                            increaseX : [BLOCKWIDTH,0,BLOCKWIDTH,0],
                            increaseY : [0,BLOCKWIDTH,-BLOCKWIDTH*2,BLOCKWIDTH],
                            flag : 2,
                            ref : 'seven'
                        }
                    }
                },
             };
             this.randomColor = {
                 /*
                 one : ['#ff8080','#ff9999'],
                 two : ['#00ff00','#80ff80'],
                 three : ['#ffff1a','#ffff99'],
                 four : ['#4d4dff','#8080ff'],
                 five : ['#ff4d94','#ff99c2'],
                 six : ['#4dd2ff','#99e6ff'],
                 seven : ['#ff9933','#ffb366']
                 */
                 
                 one : ['#F06292','#EC407A',1],
                 two : ['#BBDEFB','#90CAF9',2],
                 three : ['#7986CB','#5C6BC0',3],
                 four : ['#B2EBF2','#80DEEA',4],
                 five : ['#C5E1A5','#AED581',5],
                 six : ['#B2DFDB','#80CBC4',6],
                 seven : ['#FFAB91','#FF8A65',7]
                 
             };
             this.boardArr = createMultipleArr(18); // 가로세로 18 X 22 (실제로블럭들이들어가는 공간은 16 X 20 == 375 X 475)
             this.boardColors = createMultipleArr(18);
             this.img = undefined;
             this.listner = undefined;
             this.downCount = 0;
             this.gameLoopHandle = undefined;
             this.threeFiveSixFlag = false;
             this.saveBlock = { increaseX : [], increaseY : [], rotation : {} };
             this.saveColor = [];
             this.block = { increaseX : [], increaseY : [], rotation : {} };
             this.freeze = false;
             this.notDown = false;
             this.waiting = false;
             this.shadowDownCount = undefined;
             this.connectionFlag = false;
             this.notUpFlag = false;
             this.notSpaceFlag = false;
             this.currentKey;
             this.gameOver = false;
             this.nextBlock = undefined;
             this.score = 0;
             this.Nokeypress = false;

             // 전체적인 게임 루프
             this.gameLoop = function (randomV,blockColor)  { // random,blockColor를 일단 바인딩은 해놨는데 항상최신화되는 this.block을쓸거임.
                if(this.block.increaseX[0] < 0) {
                    console.log(this.block);
                }
                if( (!this.waiting) ? this.settleBlock( this.checkBottom(this.block.increaseX[0],BLOCKWIDTH,BLOCKHEIGHT,this.block,this.blockColor,1)) : true ) {
                    if(this.freeze) {
                        this.freeze = false;
                        this.notDown = false;
                        this.notUpFlag = false;
                        this.waiting = false;
                        
                        window.clearInterval(this.gameLoopHandle);
                        this.bump(true);
                        // three , five , six 는 처음에 블럭그릴떄 임의로 시작Y에 25를 더해야된다.
                        this.blockSetting();
                        this.gameLoopHandle = window.setInterval(this.gameLoop.bind(this,this.block,this.blockColor) ,1000);
                    }
                    
                } else {
                    this.notSpaceFlag = true;
                    this.downCount+=25;   
                    this.eraseBoard();
                    this.makeBlock(this.block.increaseX[0],this.downCount,BLOCKWIDTH,BLOCKHEIGHT,this.blockColor,this.block);    
                    this.shadowBlock();            
                }
            }
        }

        blockSetting() {
            this.copy();

            this.nextBlock = undefined === this.nextBlock ? this.choiceRandom() : this.nextBlock;

            if ( this[blocks].three === this.nextBlock[0] ||  this[blocks].six === this.nextBlock[0] || this[blocks].five === this.nextBlock[0] || this[blocks].one === this.nextBlock[0])  // 맨처음그리는 블럭이 두번째줄에있기때문. 맨끝(4번쨰)에 그리는블럭은 그 윗줄에 그려진다.
                this.downCount = -25;
            else 
                this.downCount = -50;
            
            this.copy(this.nextBlock[0],this.nextBlock[1]);
            this.block = this.nextBlock[0];
            this.blockColor = this.nextBlock[1];

            this.nextBlock = this.choiceRandom();
            this.previewBlock();    

            /*
            let [randomV,blockColor] = [...this.choiceRandom()];
            
            this.copy(randomV,blockColor);
            this.block = randomV;
            this.blockColor = blockColor;

            if ( this[blocks].three === randomV || this[blocks].five === randomV || this[blocks].six === randomV) {
                this.downCount = 0;
            } else {
                this.downCount = -25;
            }

            this.copy(this.nextBlock[0],this.nextBlock[1]);
            this.block = this.nextBlock[0];
            this.blockColor = this.nextBlock[1];

            this.nextBlock = this.choiceRandom();
            this.previewBlock();            
            
            if ( this[blocks].three === this.nextBlock[0] || this[blocks].five === this.nextBlock[0] || this[blocks].six === this.nextBlock[0]) { // 맨처음그리는 블럭이 두번째줄에있기때문. 맨끝(4번쨰)에 그리는블럭은 그 윗줄에 그려진다.
                this.downCount = 0;
            } else {
                this.downCount = -50;
            }
            */
            

        }

        init() {
            // avalilable COL 1~20
            // avalilable ROW 1~16
            for(let i=0; i<22; i++) {
                this.boardArr[i][0] = 1;
                this.boardArr[i][17] = 1;
                //this.boardArr[0][i] = 1; 
                this.boardArr[21][i] = 1;
            }
            for(let i=0; i<22; i++) {
                for(let j=0; j<18; j++) 
                    this.boardColors[i][j] = 0;
            }

            this.blockSetting();
            this.enrollEvent(this);
            this.gameLoopHandle = window.setInterval(this.gameLoop.bind(this,this.block,this.blockColor) ,1000);
        }

        // 블럭끼리 부딪혔을 때
        bump(flag) {
             // [this.block,this.blockColor] = [...this.choiceRandom()]; 이코드는 에러남.    
            this.eraseBoard();
            this.makeBlock(this.block.increaseX[0],this.downCount,BLOCKWIDTH,BLOCKHEIGHT,this.blockColor,this.block); 
            this.img = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
        }

        

        enrollEvent(t) {
            let b1,b2,b3,b4;

            this.listner = (e) => {
                let x,y,check,flag,checkFlag;
                checkFlag = true;
                x=y=0;
                
                if(this.gameOver === true) return;
                if(this.Nokeypress) return;

                switch(e.keyCode) {
                    // left (왼쪽으로가면 x축 = -25)
                    case 37 : x = -25; flag = 'left'; this.currentKey = 37;
                    break;
                    // up ( 도형회전 )
                    case 38 : {
                        if(this.notUpFlag) return;
                        this.currentKey = 38;
                        checkFlag = t.blockRotate();
                    }  
                    break;
                    // right (오른쪽으로가면 x축 = +25)
                    case 39 : x = 25; flag = 'right'; this.currentKey = 39; 
                    break;
                    // down (아래쪽으로가면 y축 = +25)
                    case 40 : y = 25; flag = 'down'; this.currentKey = 40;
                    break;
                    // space (스트레이트)
                    case 32 : {
                        t.eraseBoard();
                        t.makeBlock(t.block.increaseX[0],t.downCount,BLOCKWIDTH,BLOCKHEIGHT,t.blockColor,t.block);
                        t.shadowBlock(); 
                        if(!this.notSpaceFlag) return;
                        blockDownSound();

                        t.downCount = t.shadowDownCount;
                        [b1,b2,b3,b4] = t.currentBlockInfo();
                        t.boardArr[ b1[0] ][ b1[1] ] = 1;
                        t.boardColors[ b1[0] ][ b1[1] ] = this.blockColor[2];
                        t.boardArr[ b2[0] ][ b2[1] ] = 1;
                        t.boardColors[ b2[0] ][ b2[1] ] = this.blockColor[2];
                        t.boardArr[ b3[0] ][ b3[1] ] = 1;
                        t.boardColors[ b3[0] ][ b3[1] ] = this.blockColor[2];
                        t.boardArr[ b4[0] ][ b4[1] ] = 1;
                        t.boardColors[ b4[0] ][ b4[1] ] = this.blockColor[2];

                        if(this.isGameOver()) {
                            t.eraseBoard();
                            t.makeBlock(t.block.increaseX[0],t.downCount,BLOCKWIDTH,BLOCKHEIGHT,t.blockColor,t.block);
                            this.gameOver = true;
                            gameOverCtx.canvas.style.display = 'block';
                            window.clearInterval(this.gameLoopHandle);
                            return;
                        }

                        if(!t.clearLine()) {
                            /*
                            t.makeBlock(t.block.increaseX[0],t.shadowDownCount,BLOCKWIDTH,BLOCKHEIGHT,t.blockColor,t.block);
                            t.bump(true);
                            */
                            t.bump(true);
                            Animate.blockEffect(this);
                            t.blockSetting();      

                            window.clearInterval(t.gameLoopHandle);
                            t.gameLoopHandle = window.setInterval(t.gameLoop.bind(t,t.block,t.blockColor) ,1000); 
                            
                            this.notSpaceFlag = false;
                            return;
                        }
                    }
                    break;
                    // ESC (일시정지) (레이아웃 구현해야함)
                    case 27 : 
                    break;
                }
                if(checkFlag)
                    check = t.checkBottom(t.block.increaseX[0],BLOCKWIDTH,BLOCKHEIGHT,t.block,t.blockColor);
                else {
                    this.notDown = false;
                    t.bump();
                    t.blockSetting();      
                    window.clearInterval(t.gameLoopHandle);
                    t.gameLoopHandle = window.setInterval(t.gameLoop.bind(t,t.block,t.blockColor) ,1000);  
                    return;
                }

                switch(check) {
                    // 키입력을 했는데 충돌이 안날 경우
                    case false : {
                        t.block.increaseX[0] += x;
                        
                        if(!this.notDown) t.downCount += y;
                    }
                    break;
                    // 키입력을 했는데 충돌이 날 경우
                    case 'COLLISION' : {
                            if(this.freeze) {
                                this.freeze = false;
                                this.notDown = false;
                                t.bump(true);
                                t.blockSetting();      

                                window.clearInterval(t.gameLoopHandle);
                                t.gameLoopHandle = window.setInterval(t.gameLoop.bind(t,t.block,t.blockColor) ,1000);     
                            }                       
                        return;          
                    }
                    break;   

                    case 'NOTLEFT' : {
                        if (flag === 'right') {
                            t.block.increaseX[0] += x;  
                        }
                        else if (flag === 'down') {
                            if(!this.notDown) t.downCount += y;   
                        }
                    }
                    break;
                    case 'NOTRIGHT' : {
                        if (flag === 'left') {
                            t.block.increaseX[0] += x;
                        }
                        else if (flag === 'down') {
                            if(!this.notDown) t.downCount += y;
                        }
                    }              
                    break;
                    case 'NOTLEFTRIGHT' : if(!this.notDown) t.downCount += y;
                    break;
                }

                this.notSpaceFlag = true;
                t.eraseBoard();
                t.makeBlock(t.block.increaseX[0],t.downCount,BLOCKWIDTH,BLOCKHEIGHT,t.blockColor,t.block);
                t.shadowBlock(); 
                
               
            }

            window.addEventListener('keydown',this.listner);
        }

        settleBlock(check) {
            switch(check) {
                    case 'COLLISION' : {
                        return true;
                    }
                    break;
                    case false :
                    case 'NOTLEFT' :
                    case 'NOTRIGHT' : return false;
                    break;
                    // not collision
                }
        }

        makeBlock(x,y,w,h,color,randomV) { 
            let originX = x,
                originY = y;       

            x = 0;
            ctx.save();
            
            ctx.fillStyle = color[0];
            
            for(let i=0; i<4; i++) {
                x+= randomV.increaseX[i] ? randomV.increaseX[i] : 0;
                y+= randomV.increaseY[i] ? randomV.increaseY[i] : 0;
                ctx.fillRect(x,y,w,h);
            }

            /*
            (입체감을 주기)
            
            한칸당 25 X 25
            x,y를 -2씩
            width,height를 -4씩 
            해주면 나름 괜찮다. 근데 shadow를 넣어줄거기때문에 shadow까지 생각해줘서

            x+3 , y+2 , w-5 , h-4
            */

            x = 0;
            y = originY;

            ctx.fillStyle = color[1];
            ctx.shadowColor = '#ffffff';
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur = 1;                

            for(let i=0; i<4; i++) {
               x+= randomV.increaseX[i] ? randomV.increaseX[i] : 0;
               y+= randomV.increaseY[i] ? randomV.increaseY[i] : 0; 
               ctx.fillRect(x+3,y+2,w-5,h-4);
            }

            ctx.restore();
            
        }

        eraseBoard() {
            ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
            ctx.putImageData(this.img,0,0);
        }

        // 생성된 블럭의 좌표에 정보표시
        checkBottom(x,w,h,randomV,blockColor,flag,upArrowFlag) { 
            let b1,b2,b3,b4,
                blockSet = [],
                tmp,tmp2,
                board = this.boardArr;
            
            // 현재 블럭좌표     
            b1 = [...this.checkBottomHelper( x,this.downCount )],
            b2 = [...this.checkBottomHelper( x+randomV.increaseX[1], this.downCount+randomV.increaseY[1] )],
            b3 = [...this.checkBottomHelper( x+randomV.increaseX[1]+randomV.increaseX[2], this.downCount+randomV.increaseY[1]+randomV.increaseY[2] )],
            b4 = [...this.checkBottomHelper( x+randomV.increaseX[1]+randomV.increaseX[2]+randomV.increaseX[3], this.downCount+randomV.increaseY[1]
                  +randomV.increaseY[2]
                  +randomV.increaseY[3] )];            
   
            blockSet.push(b1);
            blockSet.push(b2);
            blockSet.push(b3);
            blockSet.push(b4);

            /*
            알고리즘을 pesudo code로 나타낸다면 다음과같다.
            1. b_idx[c-1][r] // 상
            2. b_idx[c+1][r] // 하
            3. b_idx[c][r-1]  // 좌
            4. b_idx[c][r+1]  // 우
            */
 
            if(b1[0] > 0 && b2[0] > 0 && b3[0] > 0 && b4[0] > 0) {

                // 주위에 블럭이 있다면
                for(let i=0; i<4; i++) {
                    tmp = blockSet[i]; 

                    if(tmp[0] === 21) return 'COLLISION'; // showBlock의 checkBottom함수를 호출하는 코드때문에 어쩔수없이 넣음.

                    if( (board[ tmp[0]-1 ][ tmp[1] ]) || (board[ tmp[0]+1 ][ tmp[1] ]) || (board[ tmp[0] ][ tmp[1]-1 ]) || (board[ tmp[0] ][ tmp[1]+1 ]) ) {        
                        // 초기에 블럭이내려올떄 예외처리. (three,five,six) 
                        if( (board[ tmp[0]+1 ][ tmp[1] ] !== 1) && (board[ tmp[0]-1 ][ tmp[1] ] === 1) &&
                            (this[blocks].one !== this.block) && (this[blocks].seven !== this.block) && b1[0] === 1 ) {
                                 // not operate 
                             
                        } 
                        else if ( (board[ tmp[0]+1 ][ tmp[1] ] !== 1) && (board[ tmp[0]-1 ][ tmp[1] ] === 1) &&
                            ((this[blocks].one === this.block) || (this[blocks].seven === this.block)) ) {

                            // 376~398 코드복사                
                            if(  (board[ tmp[0] ][ tmp[1]-1 ] === 1) ) {
                                if (upArrowFlag) {
                                    if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {
                                        return 'COLLISION';
                                    } else 
                                        return 'NOTLEFT';    
                                } else {
                                    if (this.isFreeze(b1,b2,b3,b4,blockSet,flag))
                                        return 'COLLISION';   
                                    else 
                                        return 'NOTLEFT';
                                }
                            }
                            else if ( (board[ tmp[0] ][ tmp[1]+1 ] === 1) ) {
                                if (upArrowFlag) {
                                    if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {                              
                                        return 'COLLISION';
                                    } else 
                                        return 'NOTRIGHT';  
                                } else {
                                    if (this.isFreeze(b1,b2,b3,b4,blockSet,flag))
                                        return 'COLLISION';   
                                    else 
                                        return 'NOTRIGHT';
                                }  
                            }
                            else {
                                if (upArrowFlag) {
                                    if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {
                                        
                                        return 'COLLISION';
                                    }
                                } else {
                                    if (this.isFreeze(b1,b2,b3,b4,blockSet,flag))
                                        return 'COLLISION';   
                                }
                            }
                            continue;
                        }

                        // 벽에 부딪히고있는 상태에서 오른쪽이나 왼쪽에 블럭이있을경우
                        else if( this.repeatBlocks(blockSet,'left') && this.repeatBlocks(blockSet,'right')) { 
                            if (upArrowFlag) {
                                 if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {            
                                        return 'COLLISION';
                                 } else 
                                        return 'NOTLEFTRIGHT';  
                            } else {
                                if (this.isFreeze(b1,b2,b3,b4,blockSet,flag))
                                    return 'COLLISION';   
                                else 
                                    return 'NOTLEFTRIGHT';
                            }
                        }

                        // 현재블럭의 왼쪽에 블럭이있을때  
                        else if( this.repeatBlocks(blockSet,'left')  ) {  
                            if (upArrowFlag) {
                                 if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {             
                                        return 'COLLISION';
                                 } else 
                                        return 'NOTLEFT';  
                            } else {
                                if (this.isFreeze(b1,b2,b3,b4,blockSet,flag))
                                    return 'COLLISION';   
                                else 
                                    return 'NOTLEFT';
                            }
                        }
                        // 현재블럭의 오른쪽에 블럭이있을때
                        else if ( this.repeatBlocks(blockSet,'right') ) {
                            if (upArrowFlag) {
                                 if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {
                                        
                                        return 'COLLISION';
                                 } else 
                                        return 'NOTRIGHT';  
                            } else {
                                if (this.isFreeze(b1,b2,b3,b4,blockSet,flag))
                                    return 'COLLISION';   
                                else 
                                    return 'NOTRIGHT';
                            }
                        }

                        else {
                            // 현재 블럭을 그대로 고정.
                            if (upArrowFlag) {
                                if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {          
                                        return 'COLLISION';
                                }
                            } else {
                                if (this.isFreeze(b1,b2,b3,b4,blockSet,flag))        
                                    return 'COLLISION';
                                else
                                    return false;
                            }
                        } 
                    } 
                }
                return false;
            } else {
                // 블럭이 막생성되었을때 맨 오른쪽이나 맨 왼쪽으로 갈 때 막혀있어야하는데 b1,b2,b3,b4중 하나라도 배열에서의 y좌표가 0이라면 조건에만족하지못해서 이쪽분기문으로오는데 여기서 따로 로직 구현.
                 
                for(let i=0; i<4; i++) {
                    //high = blockSet[1] > high ? blockSet[1] : high;
                    //low = blockSet[1] > low ? low : blockSet[1];
                    if(b1[1] === 1 || b2[1] === 1 || b3[1] === 1 || b4[1] === 1)    return 'NOTLEFT';
                    else if(b1[1] === 16 || b2[1] === 16 || b3[1] === 16 || b4[1] === 16) return 'NOTRIGHT';
                }

                return false;    // 블럭이 막생성되어 내려올떄 방향키를 누르면 렉 먹힌것 처럼 씹히게되는데 이거에대한 조치.
            }
        }

        repeatBlocks(blockSet,flag) {
            let tmp;

            if(flag === 'left' || flag === 'right') {
                flag = (flag === 'left') ? -1 : 1;

                for(let i=0; i<4; i++) {
                    tmp = blockSet[i];
                    if(  (this.boardArr[ tmp[0] ][ tmp[1]+flag ] === 1) ) {  
                        //if(! ((this.block.ref === 'one' && this.block.increaseX[0] >= 300) && (flag === -1)) )       // // one의x값이 300이상일때 left,right둘다 이조건을 만족하므로 left일경우 다른조건은 임의적으로 제외              
                            return true;
                        // 937 ~ 952 코드 참고해서 대채해보기.
                    }
                }
            } 
        }

        checkBelowBlock(b1,b2,b3,b4,blockSet) {
            let tmp,
                board = this.boardArr;

            for(let j=0; j<4; j++) {
                tmp = blockSet[j];
                //내려갈수없을을때 (오른쪽이나왼쪽으로 overflow된거는 아님)
                if(board[ tmp[0]+1 ][ tmp[1] ] === 1 ) {
                    if(tmp[1] <= 16 && tmp[1] >= 1) {
                        this.notDown = true;        
                        return true;
                    }
                }
            }
            return false; 
        }

        isFreeze(b1,b2,b3,b4,blockSet,flag) {  
            let board = this.boardArr;
           
            if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {  
                // 블럭이 밑으로충돌날때마다 줄삭제하는 함수를 호출한다.
                // 0.5초의 추가시간을 준다. 
                if(!this.waiting && (!this.clearLine())) {    
                    this.waiting = true;
        
                    // 한 번 만 실행
                    window.setTimeout( () => {

                        this.notUpFlag = true;
                        b1 = [...this.checkBottomHelper( this.block.increaseX[0],this.downCount )],
                        b2 = [...this.checkBottomHelper( this.block.increaseX[0]+this.block.increaseX[1], this.downCount+this.block.increaseY[1] )],
                        b3 = [...this.checkBottomHelper( this.block.increaseX[0]+this.block.increaseX[1]+this.block.increaseX[2], this.downCount+this.block.increaseY[1]+this.block.increaseY[2] )],
                        b4 = [...this.checkBottomHelper( this.block.increaseX[0]+this.block.increaseX[1]+this.block.increaseX[2]+this.block.increaseX[3], this.downCount+this.block.increaseY[1]
                            +this.block.increaseY[2]
                            +this.block.increaseY[3] )]; 

                        blockSet = [];
                        blockSet.push(b1);
                        blockSet.push(b2);
                        blockSet.push(b3);
                        blockSet.push(b4);    

                        if (this.checkBelowBlock(b1,b2,b3,b4,blockSet)) {
                            this.freeze = true;

                            board[ b1[0] ][ b1[1] ] = 1;
                            this.boardColors[ b1[0] ][ b1[1] ] = this.blockColor[2];
                            board[ b2[0] ][ b2[1] ] = 1;
                            this.boardColors[ b2[0] ][ b2[1] ] = this.blockColor[2];
                            board[ b3[0] ][ b3[1] ] = 1;
                            this.boardColors[ b3[0] ][ b3[1] ] = this.blockColor[2];
                            board[ b4[0] ][ b4[1] ] = 1;
                            this.boardColors[ b4[0] ][ b4[1] ] = this.blockColor[2];

                            blockDownSound();

                            if(this.isGameOver()) {
                                this.gameOver = true;
                                gameOverCtx.canvas.style.display = 'block';
                                window.clearInterval(this.gameLoopHandle);
                            }

                            return true;
                        } else {
                            this.notUpFlag = false;
                            this.waiting = false;
                            return false;
                        }
                    },500);              
                }            
            }
            else {
                this.notDown = false;
                return false;
            }    
            if(flag) return true;
            return false;
        }

        checkBottomHelper(r = null,c) {
            let row = r/25,
                col = c/25,
                ret = [];  

            // COL
            if(c === 0) ret.push(1);
            else if (c < 0) ret.push(0);
            else if(col <= 20) {
                if (col >= 1 && col <= 20) {  
                    ret.push(col+1);
                }     
            }
            if(r === null) return ret[0];

            // ROW 
            if(r === 0) ret.push(1);

            else if(row <= 18) {        
                if (row >= 1 && row <= 18) ret.push(row+1);
            }

            return ret.length === 0 ? [0,0] : ret;
        }

        choiceRandom() {
            let randomV = Math.floor(Math.random() * 7) + 1;
            let blockColor = Math.floor(Math.random() * 7) + 1;

            switch(randomV) {
                case 1 : randomV = this[blocks].one;
                break;
                case 2 : randomV = this[blocks].two;
                break;
                case 3 : randomV = this[blocks].three;
                break;
                case 4 : randomV = this[blocks].four;
                break;
                case 5 : randomV = this[blocks].five;
                break;
                case 6 : randomV = this[blocks].six;
                break;
                case 7 :  randomV = this[blocks].seven;
                break;
            }

            switch(blockColor) {
                case 1 : blockColor = this.randomColor.one;
                break;
                case 2 : blockColor = this.randomColor.two;
                break;
                case 3 : blockColor = this.randomColor.three;
                break;
                case 4 : blockColor = this.randomColor.four;
                break;
                case 5 : blockColor = this.randomColor.five;
                break;
                case 6 : blockColor = this.randomColor.six;
                break;
                case 7 : blockColor = this.randomColor.seven;
                break;
            }
            return [ randomV,blockColor ];
        }

        currentBlockInfo() {
            let b1,b2,b3,b4;
            b1=b2=b3=b4=[];

            b1 = [...this.checkBottomHelper( this.block.increaseX[0],this.downCount )],
            b2 = [...this.checkBottomHelper( this.block.increaseX[0]+this.block.increaseX[1], this.downCount+this.block.increaseY[1] )],
            b3 = [...this.checkBottomHelper( this.block.increaseX[0]+this.block.increaseX[1]+this.block.increaseX[2], this.downCount+this.block.increaseY[1]+this.block.increaseY[2] )],
            b4 = [...this.checkBottomHelper( this.block.increaseX[0]+this.block.increaseX[1]+this.block.increaseX[2]+this.block.increaseX[3], this.downCount+this.block.increaseY[1]
                            +this.block.increaseY[2]
                            +this.block.increaseY[3] )];
            return [b1,b2,b3,b4];
        }

        shadowBlock() {
            let x,y,board,bestHighPosition,backupDownCount,tmp = [], b1,b2,b3,b4, flag , constantB1 , exitFlag , cnt;
            x=y=bestHighPosition= 0;
            board = this.boardArr;
            backupDownCount = this.downCount;
            flag = false;
            exitFlag = false;
            [b1,b2,b3,b4] = this.currentBlockInfo();
            [constantB1] = this.currentBlockInfo();
            cnt = 0;
            
            let collisionValue;
          
            while(1) {
                if(b1[0] === 22 || b2[0] === 22 || b3[0] === 22 || b4[0] === 22) break;

                if(board[ b1[0] ][ b1[1] ] === 1) {
                    if(b1[0] !== 0 && b2[0] !== 0 && b3[0] !== 0 && b4[0] !== 0) {
                        if( (board[ b1[0]-1 ][ b1[1] ] === 0) || (board[ b2[0]-1 ][ b2[1] ] === 0) || (board[ b3[0]-1 ][ b3[1] ] === 0) || (board[ b4[0]-1 ][ b4[1] ] === 0) ) {
                            if(this.block === this[blocks].seven && constantB1[0] !== 21 )
                                flag = true;
                        }
                    }
                    
                    bestHighPosition = flag ? (b1[0]-1)*BLOCKHEIGHT : (b1[0]-2)*BLOCKHEIGHT;
                    break;
                } else if(board[ b2[0] ][ b2[1] ] === 1) {
                    bestHighPosition =  (b2[0]-2)*BLOCKHEIGHT;
                    break;
                } else if(board[ b3[0] ][ b3[1] ] === 1) {
                    if(b3[0] === 21)
                        bestHighPosition = (b3[0]-2)*BLOCKHEIGHT; 
                    else {
                        if( board[b3[0]-1][b3[1]] === 0 ) { // 한칸올렸을 때 충돌이 안난다면
                            for(let i=0; i<4; i++) {
                                if(this.block.increaseY[i] < 0)
                                    bestHighPosition = (b3[0]-3)*BLOCKWIDTH;
                            }
                            bestHighPosition = bestHighPosition === 0 ? (b3[0]-2)*BLOCKHEIGHT : bestHighPosition;
                            
                            if( board[b3[0]][b3[1]] === 1 ) {  // 한번 조치했는데 또 충돌이난다면 
                                switch( (b4[0]*BLOCKWIDTH) - (Math.min(b1[0],b2[0],b3[0],b4[0])*BLOCKWIDTH)  ) {
                                    case 0 : collisionValue = 2;
                                    break;
                                    case 25 : collisionValue = 3;
                                    break;
                                    case 50 : collisionValue = 4;
                                    break;
                                    case 75 : collisionValue = 5;
                                    break;
                                }
                                bestHighPosition =  flag ? (b4[0]-1)*BLOCKHEIGHT : (b4[0]-collisionValue)*BLOCKHEIGHT;
                            }
                            break;
                        } 
                    }
                } else if(board[ b4[0] ][ b4[1] ] === 1) {
                    if(b1[0] !== 0 && b2[0] !== 0 && b3[0] !== 0 && b4[0] !== 0) {
                        //b1인거에 주의.
                        if( (board[ b1[0]-1 ][ b1[1] ] === 0) || (board[ b2[0]-1 ][ b2[1] ] === 0) || (board[ b3[0]-1 ][ b3[1] ] === 0) || (board[ b4[0]-1 ][ b4[1] ] === 0) ) {
                            if(this.block === this[blocks].five && constantB1[0] !== 21 )
                                flag = true;
                        }
                    }
                    if(b4[0] === 21)
                        bestHighPosition = (b4[0]-2)*BLOCKHEIGHT; 
                    else {
                        if( board[b4[0]-1][b4[1]] === 0 ) {   // 한칸올렸을 때 충돌이 안난다면
                            for(let i=0; i<4; i++) {
                                if(this.block.increaseY[i] > 0)  // 만약에 윗줄부터그리는블럭이면 1칸을 더 당겨준다.
                                    bestHighPosition = (b4[0]-3)*BLOCKWIDTH;
                            }

                            bestHighPosition = bestHighPosition === 0 ? (b4[0]-2)*BLOCKHEIGHT : bestHighPosition;
                            
                            if( board[b4[0]][b4[1]] === 1 ) {
                                switch( (b4[0]*BLOCKWIDTH) - (Math.min(b1[0],b2[0],b3[0],b4[0])*BLOCKWIDTH)  ) {
                                    case 0 : collisionValue = 2;
                                    break;
                                    case 25 : collisionValue = 3;
                                    break;
                                    case 50 : collisionValue = 4;
                                    break;
                                    case 75 : collisionValue = 5;
                                    break;
                                }
                                bestHighPosition =  flag ? (b4[0]-1)*BLOCKHEIGHT : (b4[0]-collisionValue)*BLOCKHEIGHT;

                                if(this.block.ref === 'seven' && this.block.flag === 2)
                                    bestHighPosition+=BLOCKWIDTH;
                            }
                            break;
                        } 
                    }
                }
                b1[0]++; b2[0]++; b3[0]++; b4[0]++;  
            }

            if(bestHighPosition === 0) bestHighPosition = 500;

            this.downCount =  (this.downCount > bestHighPosition) ? this.downCount : bestHighPosition;
            
            while(1) {
                cnt++;
                if(cnt > 30) break; // 이 반복문이 꽤 많이 반복된다면 this.dwonCount가 무한으로 증가하고빠지기때문이다 이러한 그림을 상상해봐라! 
                             
                if(exitFlag) break;

                switch (this.checkBottom(this.block.increaseX[0],BLOCKWIDTH,BLOCKHEIGHT,this.block,this.blockColor,0,1)) {
                    case 'COLLISION' : {       
                        [b1,b2,b3,b4] = this.currentBlockInfo();

                        if(board[ b1[0] ][ b1[1] ] !== 1 && board[ b2[0] ][ b2[1] ] !== 1 && board[ b3[0] ][ b3[1] ] !== 1 && board[ b4[0] ][ b4[1] ] !== 1 ) {
                            exitFlag = true;
                        }
                        else {
                            this.downCount-=BLOCKHEIGHT;
                        }
                    }
                    break;
                    case false : {
                        this.downCount+=BLOCKHEIGHT;
                    }
                    break;
                    default : {
                        exitFlag = true;
                    }
                    break;
                }
            }    
            this.notDown = false;
            ctx.save();
            ctx.strokeStyle = '#ed0e2b';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            //ctx.shadowColor = '#ed0e2b';
           
            y = this.downCount;

            this.shadowDownCount = y;
    
            for(let i=0; i<4; i++) {
                x+= this.block.increaseX[i] ? this.block.increaseX[i] : 0;
                y+= this.block.increaseY[i] ? this.block.increaseY[i] : 0;
                ctx.strokeRect(x,y,BLOCKWIDTH,BLOCKHEIGHT);
            }

            ctx.restore();
            this.downCount = backupDownCount;
        }

        blockRotate() {
            let flag,existingBlock,x,backupDownCount,board,b1,b2,b3,b4;
            x = this.block.increaseX[0];
            backupDownCount = this.downCount;
            board = this.boardArr;

        
            switch(this.block.ref) {
                case 'one' : flag = this.blockRotateHelper(this.block.flag,2);
                break;
                case 'two' : flag = this.blockRotateHelper(this.block.flag,4);
                break;
                case 'three' : flag = this.blockRotateHelper(this.block.flag,4);
                break;
                case 'four' : return true;
                break;
                case 'five': flag = this.blockRotateHelper(this.block.flag,2);
                break;
                case 'six' : flag = this.blockRotateHelper(this.block.flag,4);
                break;
                case 'seven' : flag = this.blockRotateHelper(this.block.flag,2);
            }

            // 기존블럭 원상복구
            this.copy();
            // 회전된 블럭을 미리 백업  this[Symbol.for('Eat2go')]
            this.copy(this[Symbol.for('Eat2go')][this.block.ref] ,this.blockColor );//this.copy(this.block,this.blockColor);//this.copy(this[blocks][this.block.ref],this.blockColor);

            switch(flag) {
                case 1 : this.block = this[blocks][this.block.ref]; 
                break;
                case 2 : this.block = this.block.rotation.two;
                break;
                case 3 : this.block = this.block.rotation.three;
                break;
                case 4 : this.block = this.block.rotation.four;
                break;
           }
           this.block.increaseX[0]=x;

           switch(this.block.ref) {
                case 'one' : {
                    if(flag === 1) this.downCount+=BLOCKWIDTH*3;
                    else this.downCount-=BLOCKWIDTH*3;
                }
                break;
                case 'two' : {
                    if(flag === 1) this.downCount-=2*BLOCKWIDTH;
                    else if(flag === 2) {} //not operate
                    else if(flag === 3) this.downCount+=BLOCKWIDTH;
                    else this.downCount+=BLOCKWIDTH;
                        
                }
                break;
                case 'three' : {
                    if(flag === 1) this.downCount+=BLOCKHEIGHT;
                    else if(flag === 2) this.downCount-=BLOCKHEIGHT;
                    else if(flag === 3) this.downCount+=BLOCKHEIGHT;
                    else this.downCount-=BLOCKHEIGHT;
                }
                break;
                case 'four' : // not operate
                case 'five' : {
                    if(flag === 2) this.downCount-=2*BLOCKHEIGHT;
                    else this.downCount+=2*BLOCKHEIGHT;
                }
                break;
                case 'six' : {
                    if(flag === 2) this.downCount-=BLOCKHEIGHT;
                    else if(flag === 3) this.downCount+=BLOCKHEIGHT;
                }
                break;
                case 'seven' : //not operate
                break;
            }
            
            
            if(this.block.ref === 'one' && this.block.flag === 1) {
                let tmp = this.currentBlockInfo(),
                    board = this.boardArr,
                    overflowValue = 16;

                if(this.block.increaseX[0] === 375) { // one의 초기x값이 375일때 회전할경우 옆에공간이없으므로 반대쪽으로 회전한다.
                    this.block.increaseX[0]-=BLOCKWIDTH*3; 
                    [b1,b2,b3,b4] = this.currentBlockInfo();
                    if( !(board[b1[0]][b1[1]] === 0 && board[b2[0]][b2[1]] === 0 && board[b3[0]][b3[1]] === 0 && board[b4[0]][b4[1]] === 0) ) {                          
                            this.block = this[blocks][this.block.ref].rotation.two;
                            this.block.increaseX[0] = x;
                            this.downCount = backupDownCount;
                            return true; // 이것은 다른블럭과의 충돌이아닌, one블럭을 뒤집었을 때 오른쪽벽에 부딪혔을 때 벽돌이 오버플로나지 않게 하기위함이며, 만약 오른쪽벽에 오버플로될때, 블럭을 다시 전상태로바꾸고 게임계속진행.               
                            
                    }     
                } else {
                    for(let i=0; i<4; i++) {
                        if(tmp[i][1] > 16) {                            
                            this.block = this[blocks][this.block.ref].rotation.two;
                            this.block.increaseX[0] = x;
                            this.downCount = backupDownCount;
                            return true; // 이것은 다른블럭과의 충돌이아닌, one블럭을 뒤집었을 때 오른쪽벽에 부딪혔을 때 벽돌이 오버플로나지 않게 하기위함이며, 만약 오른쪽벽에 오버플로될때, 블럭을 다시 전상태로바꾸고 게임계속진행.               
                        }
                    }
                } 
            
               
                  
                return true;

                /*
                for(let i=0; i<4; i++) {
                    if(tmp[i][1] > 16) {                            
                        this.block = this[blocks][this.block.ref].rotation.two;
                        this.block.increaseX[0] = x;
                        this.downCount = backupDownCount;
                        return true; // 이것은 다른블럭과의 충돌이아닌, one블럭을 뒤집었을 때 오른쪽벽에 부딪혔을 때 벽돌이 오버플로나지 않게 하기위함이며, 만약 오른쪽벽에 오버플로될때, 블럭을 다시 전상태로바꾸고 게임계속진행.               
                    }
                }
                */
            }

            [b1,b2,b3,b4] = this.currentBlockInfo();

            switch (this.checkBottom(this.block.increaseX[0],BLOCKWIDTH,BLOCKHEIGHT,this.block,this.blockColor,0,1)) {
                case 'COLLISION' : {
                    let x = this.block.increaseX[0];
                    let blockSet = [];
                    let board = this.boardArr;
                    let operateFlag;
                    let exitFlag = false;

                    blockSet.push(b1); blockSet.push(b2); blockSet.push(b3); blockSet.push(b4);
                    

                    // 도형을 회전했는데 회전한도형의 좌표에 다른블럭들이 없으면 즉, 충돌이 없다면 블럭을 새로 그려주고 게임 계속진행.
                    if(board[b1[0]][b1[1]] === 0 && board[b2[0]][b2[1]] === 0 && board[b3[0]][b3[1]] === 0 && board[b4[0]][b4[1]] === 0 ) {
                        this.eraseBoard();
                        this.makeBlock(this.block.increaseX[0],this.downCount,BLOCKWIDTH,BLOCKHEIGHT,this.blockColor,this.block);
                        this.shadowBlock(); 
                        return true;
                        // not operate
                    } else // 충돌발생
                        return this.backupToPreviousBlock(x,backupDownCount);
                }
                break;
                case 'NOTLEFT' : {
                    // 도형을 회전했는데 회전한도형의 좌표에 다른블럭들이 없으면 즉, 충돌이 없다면 블럭을 새로 그려주고 게임 계속진행.
                    if(board[b1[0]][b1[1]] === 0 && board[b2[0]][b2[1]] === 0 && board[b3[0]][b3[1]] === 0 && board[b4[0]][b4[1]] === 0 ) {
                        let [b1,b2,b3,b4] = this.currentBlockInfo();
                        let tmp = 0;
                        for(let i=1; i<=3; i++) 
                            tmp+= this.block.increaseX[i] < 0 ? this.block.increaseX[i] : 0;

                        if(b1[1] >=1 && b2[1] >= 2 && b3[1] >=3 && b4[1] >= 1) {}  // not operate
                        else this.block.increaseX[0]+=Math.abs(tmp);
                        return true;
                    } else 
                        return this.backupToPreviousBlock(x,backupDownCount);
                }
                break;
                case 'NOTRIGHT' : {
                    // 도형을 회전했는데 회전한도형의 좌표에 다른블럭들이 없으면 즉, 충돌이 없다면 블럭을 새로 그려주고 게임 계속진행.
                    if(board[b1[0]][b1[1]] === 0 && board[b2[0]][b2[1]] === 0 && board[b3[0]][b3[1]] === 0 && board[b4[0]][b4[1]] === 0 ) {
                        let [b1,b2,b3,b4] = this.currentBlockInfo();
                        let tmp = 0;
                        for(let i=1; i<=3; i++) 
                            tmp+= this.block.increaseX[i] > 0 ? this.block.increaseX[i] : 0;
                        
                        if(this.block.ref === 'one' && this.block.flag === 1) {
                            if(this.block.increaseX[0] === 375)  // one의 초기x값이 375일때 회전할경우 옆에공간이없으므로 반대쪽으로 회전한다.
                                this.block.increaseX[0]-=BLOCKWIDTH*3; 
                            
                            else if(this.block.increaseX[0] === 300) {} // 300이면 옆에 여유공간75남으니까 회전가능. 아무런코드를 적지않는다. 왜냐하면 바깥에 else문에서 작동할테니까.
                            
                            else if(board[b4[0]][b4[1]] === 1 )  { // 블럭을 눕혔을때 (flag===1) 맨오른쪽블럭기준으로 충돌이발생할경우
                                this.block = this[blocks][this.block.ref].rotation.two;
                                this.block.increaseX[0] = x;
                                this.downCount = backupDownCount;
                            }
                        }
                        else {
                            if(b1[1] <= 16 && b2[1] <= 16 && b3[1] <= 16 && b4[1] <= 16) {} // not operate 
                            else this.block.increaseX[0]-=tmp - BLOCKWIDTH;
                        }
                        return true;
                    } else if(b1[1] >= 16 || b2[1] >= 16 || b3[1] >= 16 || b4[1] >= 16) { // 맨오른쪽에 블럭이있을떄 회전하고자 할 경우
                        let overflowValue = 16,
                            set = [b1,b2,b3,b4];

                        for(let i=1; i<=3; i++) 
                            overflowValue = set[i][1] > overflowValue ? set[i][1] : overflowValue; 
                        
                        overflowValue = (overflowValue - 16) * BLOCKWIDTH;
                        this.block.increaseX[0]-=overflowValue;

                        [b1,b2,b3,b4] = this.currentBlockInfo();

                        if(b1[1] === 1 || b2[1] === 1 || b3[1] === 1 || b4[1] === 1) {
                            this.block.increaseX[0]+=overflowValue;
                            return this.backupToPreviousBlock(x,backupDownCount);
                        } else return true;                           
                    } else
                        return this.backupToPreviousBlock(x,backupDownCount);
                }
                break;
                case 'NOTLEFTRIGHT' : {
                    console.log('NOTLEFTRIGHT');
                    // NOTLEFTRIGHT가 걸릴 경우, 전의 블럭으로 되돌린다. 
                    this.backupToPreviousBlock(x,backupDownCount);
                }
                break;
                default : {
                    this.eraseBoard();
                    this.makeBlock(this.block.increaseX[0],this.downCount,BLOCKWIDTH,BLOCKHEIGHT,this.blockColor,this.block);
                    this.shadowBlock(); 
                    return true;
                }
            }
        }

        blockRotateHelper(existingFlag,maxRotatable) {
            return (existingFlag < maxRotatable) ? existingFlag+1 : 1;
        }

        backupToPreviousBlock(x,y) {
            let b1,b2,b3,b4;
            let board = this.boardArr;
            // 충돌이 났으면 전의 블럭으로 다시복구한다. 그리고 밑에블럭이 있으면 좌표저장하고 겜루프 종료했다가 재시작, 밑에블럭이없으면 계속진행.
                        switch(this.block.ref) {
                            case 'one' : 
                            case 'five' :
                            case 'seven' : {
                                switch(this.block.flag) {
                                    case 1 : this.block = this[blocks][this.block.ref].rotation.two;
                                    break;
                                    case 2 : this.block = this[blocks][this.block.ref];
                                    break;
                                }
                            }
                            break;
                            case 'two' : 
                            case 'three' :
                            case 'six' : {
                                switch(this.block.flag) {
                                    case 1 : this.block = this[blocks][this.block.ref].rotation.four;
                                    break;
                                    case 2 : this.block = this[blocks][this.block.ref];
                                    break;
                                    case 3 : this.block = this[blocks][this.block.ref].rotation.two;
                                    break;
                                    case 4 : this.block = this[blocks][this.block.ref].rotation.three;
                                }
                            }
                            break;
                            case 'four' : // not operate 
                            break;
                        }
                        this.block.increaseX[0] = x;
                        this.downCount = y;
                        // switch문으로 블럭을 다시 복구했다. 블럭을복구하는로직은 충돌이났다면 밑에블럭이있든없든 실행되어야하기때문에 따로 분기문으로 작성하지 않는다.

                        [b1,b2,b3,b4] = this.currentBlockInfo();
                        if(this.checkBelowBlock(b1,b2,b3,b4,[b1,b2,b3,b4])) {
                            board[b1[0]][b1[1]] = 1;
                            this.boardColors[ b1[0] ][ b1[1] ] = this.blockColor[2];
                            board[b2[0]][b2[1]] = 1;
                            this.boardColors[ b2[0] ][ b2[1] ] = this.blockColor[2];
                            board[b3[0]][b3[1]] = 1;
                            this.boardColors[ b3[0] ][ b3[1] ] = this.blockColor[2];
                            board[b4[0]][b4[1]] = 1;
                            this.boardColors[ b4[0] ][ b4[1] ] = this.blockColor[2];

                            return false;
                        } else {
                            return true;
                        }
        }

        clearLine() {
            let board = this.boardArr,
                y = [],
                bestHighValueY = 0,
                yLength,
                bestLowValueY = 0,
                transfer_y = [],
                flagArr = [],
                [b1,b2,b3,b4] = this.currentBlockInfo();

            switch(this.block.ref) {
                case 'one' : {
                    switch(this.block.flag) {
                        case 1 : yLength = 1;
                        break;
                        case 2 : yLength = 4;
                        break;
                    }
                }
                break;
                case 'two' :
                case 'three' :
                case 'six' : {
                   switch(this.block.flag) {
                        case 1 : yLength = 2;
                        break;
                        case 2 : yLength = 3;
                        break;
                        case 3 : yLength = 2;
                        break;
                        case 4 : yLength = 3;
                        break;
                    } 
                }    
                break;    
                case 'four' : yLength = 2;
                break;
                case 'five' :
                case 'seven' : {
                    switch(this.block.flag) {
                        case 1 : yLength = 1;
                        break;
                        case 2 : yLength = 3;
                    }
                }
                break;
            }

            for(let i=0; i<yLength; i++) flagArr[i] = true;

            bestHighValueY = Math.max(b1[0],b2[0],b3[0],b4[0])*BLOCKHEIGHT-BLOCKHEIGHT;
            bestLowValueY = Math.min(b1[0],b2[0],b3[0],b4[0])*BLOCKHEIGHT-BLOCKHEIGHT;

            switch(yLength) {
                case 1 : y[0] = this.checkBottomHelper(undefined,bestHighValueY);
                break;
                case 2 : y[0] = this.checkBottomHelper(undefined,bestHighValueY); y[1] = this.checkBottomHelper(undefined,bestLowValueY);
                break;
                case 3 : {
                    y[0] = this.checkBottomHelper(undefined,bestHighValueY);
                    y[2] = this.checkBottomHelper(undefined,bestLowValueY);
                    y[1] = y[2]+1;
                }
                break;
                case 4 : {
                    bestHighValueY = 0;
                    for(let i=3; i>=0; i--) {
                        y[i] = this.checkBottomHelper(undefined,this.downCount + bestHighValueY); 
                        bestHighValueY+= this.block.increaseY[i];
                    }
                }
                break;
            }
         
            // 일단 여기서 블럭은 확정짓지않는다(좌표저장을뜻함) 그래서 긴 조건문으로 블럭이확정되잇다고 가정하고 삭제해야될 라인(col)을 체크한다.
            for(let i=0; i<y.length; i++) {
                for(let j=1; j<=16; j++) {
                    if(board[y[i]][j] === 0) {  
                        if( (y[i] === b1[0] && j === b1[1]) || (y[i] === b2[0] && j === b2[1]) || (y[i] === b3[0] && j === b3[1]) || (y[i] === b4[0] && j === b4[1]) ) {} // not operate
                        //if(j === b1[1] || j === b2[1] || j=== b3[1] || j === b4[1]) {}// not operate
                        else {
                            flagArr[i] = false;
                            break;
                        }
                    }
                }
            }    
            
            for(let i=0; i<y.length; i++) {
                if(flagArr[i]) {
                    transfer_y.push(y[i]);    
                    board[b1[0]][b1[1]] = 1;
                    this.boardColors[ b1[0] ][ b1[1] ] = this.blockColor[2];
                    board[b2[0]][b2[1]] = 1;
                    this.boardColors[ b2[0] ][ b2[1] ] = this.blockColor[2];
                    board[b3[0]][b3[1]] = 1;
                    this.boardColors[ b3[0] ][ b3[1] ] = this.blockColor[2];
                    board[b4[0]][b4[1]] = 1;    
                    this.boardColors[ b4[0] ][ b4[1] ] = this.blockColor[2];
                }
              }
            return this.pullBlock(transfer_y);
            
        }

        pullBlock(yArr) {  // yArr[0] = bestHighValueY  ,  yArr[yArr.length-1] = bestLowValueY
            // 블럭을 한칸씩 당기기 (여기서부터 구현 + 애니메이션까지..)
            if(yArr.length === 0) return false;
            blockClearSound();
            this.recordUpdate(yArr.length*10);
            

            let [b1,b2,b3,b4] = this.currentBlockInfo();
            let blockSet = [];      
            let willPullScopeBlock, // 밑으로 당겨질 블럭의 범위
                willPullBlocks = [], // 당겨질 블럭들의 좌표배열
                cnt = 1,
                flag = false,
                board = this.boardArr,
                lineNum = 1,
                loopbreak = false,
                loopbreak2 = true,
                tmpArr = [],
                color = 0,
                blockNum = 0,
                loopCount = 0,
                finish = false,
                lines= new Map();

            blockSet.push(b1);  blockSet.push(b2);  blockSet.push(b3);  blockSet.push(b4);    

           // 빨간블럭(shadowBlock)이 안남게하기위해서 블럭을 새로 그려준다.
            for(let i=0; i<4; i++) {
                ctx.save();
                ctx.beginPath();
                ctx.rect((blockSet[i]-1)*BLOCKWIDTH,(blockSet[i]-1)*BLOCKWIDTH,BLOCKWIDTH+2,BLOCKWIDTH);
                ctx.clip();
                ctx.clearRect(0,0,400,500);
                ctx.restore();

                // x+3 , y+2 , w-5 , h-4
                ctx.fillStyle = this.blockColor[0];
                ctx.fillRect((blockSet[i][1]-1)*BLOCKWIDTH,(blockSet[i][0]-1)*BLOCKWIDTH,BLOCKWIDTH,BLOCKWIDTH);
                ctx.fillStyle = this.blockColor[1];
                ctx.shadowColor = '#ffffff';
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur = 1; 
                ctx.fillRect((blockSet[i][1]-1)*BLOCKWIDTH+3,(blockSet[i][0]-1)*BLOCKWIDTH+2,BLOCKWIDTH-5,BLOCKWIDTH-4);
                
            }     
            
            // 당겨질 좌표들을 모두 저장
            while(1) {
                flag = false;
                loopbreak = false;
                for(let j=1; j<yArr.length; j++) {
                    if(yArr[0]-cnt === yArr[j]) {
                        loopbreak = true;
                        cnt++;    
                    }
                }

                if(loopbreak) continue;
                
                for(let i=1; i<=16; i++) {
                    // 지워야 되는 줄중에서 가장밑에 있는 줄을 기준으로 분기.
                    if(board[yArr[0]-cnt][i] === 1 ) {   // if(board[ yArr[yArr.length-1]-cnt ][i] === 1 ) (가장 윗줄을 기준으로 분기)
                        willPullBlocks.push([ yArr[0]-cnt , i ]);  // willPullBlocks.push([ yArr[yArr.length-1]-cnt, i ]); 
                        flag = true;  
                    }
                }
                if(!flag) {
                    willPullScopeBlock = yArr[0]-1; // yArr[yArr.length-1]-1;
                    break;
                }
                cnt++;
            }
            ctx.save();
            ctx.beginPath();
            Animate.lineAnimate(yArr,BLOCKWIDTH,this);
            // 당겨야 할 블럭삭제
            ctx.rect(0,0,400,yArr[0]*BLOCKHEIGHT ); //0,willPullScopeBlock * BLOCKHEIGHT,400,  Math.abs(yArr[0] - willPullScopeBlock) * BLOCKHEIGHT 
            ctx.clip();
            ctx.clearRect(0,0,400,500);
            utilDrawing.drawBoard(t);
            ctx.restore();

            // 당겨질 좌표값들을 전부 0으로 설정 
            for(let i=0; i<willPullBlocks.length; i++)  board[ willPullBlocks[i][0] ][ willPullBlocks[i][1] ] = 0;
            // 삭제된 라인의 좌표값들을 0으로 재설정 + 색상좌표초기화
            for(let i=0; i<yArr.length; i++) {
                for(let j=1; j<=16; j++) { 
                    board[yArr[i]][j] = 0;
                    this.boardColors[i][j] = 0;
                }
            }

            for(let i=0; i<willPullBlocks.length; i++) {
                willPullBlocks[i][0]+= lineNum; // 당겨야될블럭들을 전부 1씩 증가.            
            }

            for(let i=0; i<willPullBlocks.length; i++) {
                if( i !== willPullBlocks.length-1 ) {
                    if(willPullBlocks[i][0] !== willPullBlocks[i+1][0]) {
                        tmpArr.push(i);
                        lines.set(willPullBlocks[i][0],tmpArr);
                        tmpArr = [];
                    } else 
                        tmpArr.push(i);  
                } else {
                    // 마지막 인덱스라면
                    tmpArr.push(i);
                    lines.set(willPullBlocks[i][0],tmpArr);
                }
            }
            // 한칸씩 밑으로 당긴 후에 만약 밑에 블럭이없을경우 충돌이 발생할 떄 까지 내려간다. (그 라인의 모든블럭이 다같이내려갈수있을 경우에만)
            while(1) {
                if(finish) {
                    if(loopCount > 1)
                        ctx.putImageData(this.img,0,0);
                    break;
                } else if(loopCount >= 1 && (!finish)) { // 밑에 블럭이없어서 계속해서 루프를 돌아야 한다면
                    this.img = ctx.getImageData(0,0,400,500);
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(0,0,400,yArr[0]*BLOCKHEIGHT );
                    ctx.clip();
                    ctx.clearRect(0,0,400,500);
                    utilDrawing.drawBoard(t,true);
                    ctx.restore();

                    blockNum = 0;   
                }

                for(let [k,v] of lines) {
                    color = 1;
                    // 먼저 내려갈 수 있는지 없는지 점검
                    for(let i=0; i<v.length; i++) {
                        if(loopCount >=1) {
                            if(loopCount >= 1 && board[k+1+loopCount][willPullBlocks[v[i]][1]] === 1) {
                            loopbreak2 = false; // 못내려간다면
                            break;
                        }
                    } else if(board[k+1][willPullBlocks[v[i]][1]] === 1) {
                            loopbreak2 = false; // 못내려간다면
                            break;    
                        }
                    }
    
                    for(let i=0; i<v.length; i++) {
                        if(loopbreak2 === true) {
                            willPullBlocks[v[i]][0]++; // col 증가
                            if(loopCount >= 1) color = 1;
                            else               color = 2;
                        } else  break;
                    }
                    //loopbreak2 = true;
                    if(!loopbreak2 && loopCount >= 1) break;

                    for(let i=blockNum; i<blockNum+v.length; i++) {
                        board[ willPullBlocks[i][0] ][ willPullBlocks[i][1] ] = 1; // 좌표값 저장
                        this.boardColors[willPullBlocks[i][0]][willPullBlocks[i][1]] = this.boardColors[willPullBlocks[i][0]-color][willPullBlocks[i][1]]; // 색상 저장 

                        if(loopCount >= 1) {
                            board[willPullBlocks[i][0]-1][willPullBlocks[i][1]] = 0; // 이전 좌표값 삭제
                            this.boardColors[willPullBlocks[i][0]-1][willPullBlocks[i][1]] = 0; // 이전 색상값 삭제
                        }

                        switch(this.boardColors[willPullBlocks[i][0]][willPullBlocks[i][1]]) {
                                case 1 : this.blockColor = this.randomColor.one;
                                break;
                                case 2 : this.blockColor = this.randomColor.two;
                                break;
                                case 3 : this.blockColor = this.randomColor.three;
                                break;
                                case 4 : this.blockColor = this.randomColor.four;
                                break;
                                case 5 : this.blockColor = this.randomColor.five;
                                break;
                                case 6 : this.blockColor = this.randomColor.six;
                                break;
                                case 7 : this.blockColor = this.randomColor.seven; 
                                break;
                        }  
                        ctx.save();
                        ctx.fillStyle = this.blockColor[0];
                        ctx.shadowColor = this.blockColor[0];
                        ctx.shadowOffsetX = 0;
                        ctx.shadowoffsetY = 0;
                        ctx.shadowBlur = 0;
                        ctx.fillRect( (willPullBlocks[i][1]-1)*BLOCKHEIGHT, (willPullBlocks[i][0]-1)*BLOCKHEIGHT+0.5 , BLOCKWIDTH , BLOCKHEIGHT-1 );
                        ctx.fillStyle = this.blockColor[1];
                        ctx.shadowColor = '#ffffff';
                        ctx.shadowOffsetX = -1;
                        ctx.shadowOffsetY = -1;
                        ctx.shadowBlur = 1; 
                        ctx.fillRect( ((willPullBlocks[i][1]-1)*BLOCKHEIGHT)+3, ((willPullBlocks[i][0]-1)*BLOCKHEIGHT)+2 , BLOCKWIDTH-5 , BLOCKHEIGHT-4 );
                        ctx.restore();
                    }

                    color = 1;
                    blockNum+=v.length;
                }
                if(!loopbreak2) finish = !finish;
                else {
                    // 조정된 블럭중에서 가장 밑에있는 줄 밑에 블럭이있나없나점검해본뒤, 있으면 이 루프를 계속진행하고 아니면 탈출한다.
                    for(let i=1; i<=16; i++) {
                        if(board[willPullBlocks[0][0]+1][i] === 1) { // 밑에 블럭이있다면 루프를 여기서 끝낸다.
                            finish = !finish;    
                        }
                    }
                }
                loopCount++;
            }


            this.img = ctx.getImageData(0,0,400,500);
            this.blockSetting();     
            window.clearInterval(this.gameLoopHandle);
            this.gameLoopHandle = window.setInterval(this.gameLoop.bind(this,this.block,this.blockColor) ,1000);  

            return true;  
        }

        isGameOver() {
            for(let i=1; i<=16; i++) {
                if(this.boardArr[2][i] === 1) {
                    for(let j=1; j<=16; j++) {
                        if(this.boardArr[1][i] === 1) {
                            gameOverSound();
                            this.PaintingGray();
                            return true;     
                        }
                    }
                }                    
            }
            return false;    
        }

        PaintingGray() {
            let board = this.boardArr,
                tmpArr = createMultipleArr(18),
                widthArr = [],
                x = 0,
                y,
                width,
                edge,
                cnt = 0,
                animationArr = [],
                animateIdx = 0,
                reqId;
            
            ctx.fillStyle = '#ebebe0';

            // 1차 검출
            for(let i=20; i>=1; i--) {
                for(let j=1; j<=16; j++) {
                    if(board[i][j] === 1) {
                        tmpArr[i][j] = 1;
                    }
                }
            }
            // 2차 검출  (requestAnimationFrame 쓸 것)
            for(let i=20; i>=1; i--) {
                for(let j=1; j<=16; j++) {
                    if(tmpArr[i][j] === 1) {
                        x = x === 0 ? j : x;
                        edge = j;
                    }
                }
                x = (x-1)*BLOCKWIDTH;
                y = i*BLOCKHEIGHT;
                width = edge*BLOCKWIDTH - x;

                //ctx.fillRect(x,y,width,BLOCKHEIGHT); 

                animationArr.push([x,y,width]);
                    
                x = 0;    
            }
            y = 500;

            reqId = window.requestAnimationFrame( function animate() {
                if(cnt === 5) {
                    if(animateIdx === animationArr.length-1) {
                        ctx.fillRect(animationArr[animateIdx][0],y,animationArr[animateIdx][2],5);
                        window.cancelAnimationFrame(reqId);
                        return;
                    }
                    ctx.fillRect(animationArr[animateIdx][0],y,animationArr[animateIdx][2],5);
                    cnt = 0;
                    animateIdx++;
                    x = animationArr[animateIdx].x;
                    width = animationArr[animateIdx].width;
                }
                ctx.fillRect(animationArr[animateIdx][0],y,animationArr[animateIdx][2],5);
                y-=5;    
                cnt++;
                
                window.requestAnimationFrame(animate);
            });
        }

        previewBlock() {   
            //고치기       
            let x = -70,
                y = (this.block.ref === 'three' || this.block.ref === 'five' || this.block.ref === 'six') ? 125 : 100;

            previewBlock.clearRect(0,0,previewBlock.canvas.width,previewBlock.canvas.height);

            previewBlock.font = '30px Courier New';
            previewBlock.textAlign = 'center';
            previewBlock.textBaseline = 'middle';
            previewBlock.fillText('Next',previewBlock.canvas.width/2,50);

            previewBlock.save();
            previewBlock.fillStyle = this.nextBlock[1][1];

            for(let i=0; i<4; i++) {
                x+= this.nextBlock[0].increaseX[i] ? this.nextBlock[0].increaseX[i] : 0;
                y+= this.nextBlock[0].increaseY[i] ? this.nextBlock[0].increaseY[i] : 0;
                previewBlock.fillRect(x,y,BLOCKWIDTH,BLOCKHEIGHT);
            }

            x = -70;
            y = (this.block.ref === 'three' || this.block.ref === 'five' || this.block.ref === 'six') ? 125 : 100;

            previewBlock.fillStyle = this.nextBlock[1][2];
            previewBlock.shadowColor = '#ffffff';
            previewBlock.shadowOffsetX = -1;
            previewBlock.shadowOffsetY = -1;
            previewBlock.shadowBlur = 1;                

            for(let i=0; i<4; i++) {
                x+= this.nextBlock[0].increaseX[i] ? this.nextBlock[0].increaseX[i] : 0;
                y+= this.nextBlock[0].increaseY[i] ? this.nextBlock[0].increaseY[i] : 0;
                previewBlock.fillRect(x+3,y+2,BLOCKWIDTH-5,BLOCKHEIGHT-4);
            }

            previewBlock.restore();
        }

        recordUpdate(score) {
            const recordCtx = document.querySelector('#record').getContext('2d');
            recordCtx.clearRect(0,0,recordCtx.canvas.width,recordCtx.canvas.height);
            recordCtx.font = '49px Impact';
            recordCtx.textAlign = 'center';
            recordCtx.textBaseline = 'middle';
            recordCtx.fillStyle = '#004f99';
            this.score += score;
            recordCtx.fillText(this.score,recordCtx.canvas.width/2,recordCtx.canvas.height/2);
        }

        

        copy(randomV,blockColor) {
            if (randomV && blockColor) {
                this.saveBlock.increaseX = [];
                this.saveBlock.increaseY = [];
                this.saveColor = [];
                
                for(let i of blockColor) {
                    this.saveColor.push(i);
                }
                for(let i of randomV.increaseX) {
                    this.saveBlock.increaseX.push(i);
                }
                for(let i of randomV.increaseY) {
                    this.saveBlock.increaseY.push(i);
                }
                this.saveBlock.ref = randomV.ref;
                this.saveBlock.flag = randomV.flag;
                this.saveBlock.rotation = {};

                
                for(let p in randomV.rotation) {
                    Object.defineProperty(this.saveBlock.rotation,p,{
                         enumerable : true,
                        writable : true,
                        configurable : true,
                        value : {}
                    });

                    this.saveBlock.rotation[p].increaseX = [];
                    this.saveBlock.rotation[p].increaseY = [];
                    this.saveBlock.rotation[p].flag = randomV.rotation[p].flag;
                    this.saveBlock.rotation[p].ref = randomV.rotation[p].ref;

                    for(let i of randomV.rotation[p].increaseX)  this.saveBlock.rotation[p].increaseX.push(i);
                    for(let i of randomV.rotation[p].increaseY)  this.saveBlock.rotation[p].increaseY.push(i);
                }
            
            } else {
                this.block = {}; // 새로만듬(여러가지이유가..)
                this.block.increaseX = [];
                this.block.increaseY = [];
                this.blockColor = [];
                this.block.rotation = {};

                for(let i of this.saveBlock.increaseX) {
                    this.block.increaseX.push(i);
                }
                for(let i of this.saveBlock.increaseY) {
                    this.block.increaseY.push(i);
                }
                for(let i of this.saveColor) {
                    this.blockColor.push(i);
                }
                this.block.flag = this.saveBlock.flag;
                this.block.ref = this.saveBlock.ref;

                for(let p in this.saveBlock.rotation) {
                    Object.defineProperty(this.block.rotation,p,{
                        enumerable : true,
                        writable : true,
                        configurable : true,
                        value : {}
                    });

                    this.block.rotation[p].increaseX = [];
                    this.block.rotation[p].increaseY = [];
                    this.block.rotation[p].flag = this.saveBlock.rotation[p].flag;
                    this.block.rotation[p].ref = this.saveBlock.rotation[p].ref;

                    for(let i of this.saveBlock.rotation[p].increaseX)   this.block.rotation[p].increaseX.push(i);
                    for(let i of this.saveBlock.rotation[p].increaseY)   this.block.rotation[p].increaseY.push(i);     
                }

                // 실제로 원본블럭에서 바뀌는 값은 increaseX[0] (x좌표) 밖에없음. 그래서 한줄로 복구.
                if(this[Symbol.for('Eat2go')][this.block.ref]) 
                    this[Symbol.for('Eat2go')][this.block.ref].increaseX[0] = this.block.increaseX[0];
            }   
        }
    }
})();





// 2차원 배열 생성기 col = 행  row = 열 
function createMultipleArr(row) {        // 가로세로 18 X 21 (실제로블럭들이들어가는 공간은 16 X 20)  
    let   multipleArr = [];

    for(let i=0; i<22; i++) {
        const rowBuffer = new ArrayBuffer(row);
        multipleArr[i] = new Uint8Array(rowBuffer);
    }

    return multipleArr;
}

function proxing(whatObj,handler) {
    return new Proxy(whatObj,handler);
}

let t = new Tetris();
utilDrawing.drawBoard(t);
t.init();

