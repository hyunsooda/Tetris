
let gradient = gameOverCtx.createLinearGradient(0,0,gameOverCtx.canvas.width,gameOverCtx.canvas.height);

// Gamover 그리기
gameOverCtx.shadowColor = 'rgba(100,100,150,0.8)';
gameOverCtx.shadowOffsetX = 5;
gameOverCtx.shadowOffsetY = 5;
gameOverCtx.shadowBlur = 10;

gameOverCtx.font = '45px Lucida Console';
gameOverCtx.strokeStyle = 'cornflowerblue';
gameOverCtx.textAlign = 'center';
gameOverCtx.textBaseline = 'middle';

gradient.addColorStop(0,'#ECEFF1');
gradient.addColorStop(0.25,'#CFD8DC');
gradient.addColorStop(0.5,'#B0BEC5');
gradient.addColorStop(0.75,'#90A4AE');
gradient.addColorStop(1.0,'#78909C');


gameOverCtx.fillStyle = gradient;
gameOverCtx.fillText('Game Over!',gameOverCtx.canvas.width/2,gameOverCtx.canvas.height/4);
gameOverCtx.strokeText('Game Over!',gameOverCtx.canvas.width/2,gameOverCtx.canvas.height/4);
//

// Replay 그리기
gameOverCtx.shadowOffsetX = 0;
gameOverCtx.shadowOffsetY = 0;
gameOverCtx.shadowBlur = 0;
gameOverCtx.lineWidth = 3;
gameOverCtx.font = '30px Lucida Console';

gameOverCtx.strokeStyle = 'rgba(128, 216, 255, 0.5)';
gameOverCtx.strokeRect(50,100,150,50);
gameOverCtx.fillText('Replay',gameOverCtx.canvas.width/2,127);
//

// Score store 그리기
gameOverCtx.strokeRect(50,170,150,50);
gameOverCtx.fillText('Record',gameOverCtx.canvas.width/2,200);
//

gameOverCtx.canvas.addEventListener('mousemove',(e) => {
    const {x,y} = translateLocation(e.clientX,e.clientY);
    if( (x >= 50 && x <= 200 && y >= 100 && y <=150) || (x >= 50 && x <= 200 && y >= 170 && y<= 220) ) {
        gameOverCtx.canvas.style.cursor = 'pointer';
    } else {
        gameOverCtx.canvas.style.cursor = 'default';
    }
});

function translateLocation(x,y) {
    const bbox = gameOverCtx.canvas.getBoundingClientRect();
    return { x : x - bbox.left , y : y - bbox.top}       
}
