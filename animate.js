class MiniRect {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 2;
        this.height = 2;
        this.orgX = x;
        this.orgY = y;
        this.degree = this.randomDegree();
    }
    randomDegree() {
        return Math.floor(Math.random() * 360) + 1;  // 0 ~ 360 
    }
}

class Animate {
    static lineAnimate (yArr,w,tetrisInstance) {
            let grad1,reqID,numHit;

            let p = new Proxy({
                counter : 0,
                y : yArr[0]
            },{
                set(target,prop,value,receiver) {
                    target[prop] = value;
                    return true;
                },
                get(target,prop,receiver) {
                    if(target[prop] >= 47.5) {
                        window.clearInterval(reqID);
                        ctx.putImageData(tetrisInstance.img,0,0);
                        tetrisInstance.Nokeypress = false;
                    }
                    else return target[prop]++;
                }
            });

            switch(yArr.length) {
                case 1 : numHit = 'single!';
                break;
                case 2 : numHit = 'double!!';
                break;
                case 3 : numHit = 'tripple!!!';
                break;
                case 4 : numHit = 'quadra!!!!';
                break;
            }

            grad1 = ctx.createLinearGradient(0,(yArr[yArr.length-1]-1)*w,475,(yArr[0]-1)*w);
            console.log(yArr);
     

            tetrisInstance.Nokeypress = true;

            reqID = window.setInterval( () => {
                ctx.save();

                grad1.addColorStop(0,'blue');
                grad1.addColorStop(0.4,'white');
                grad1.addColorStop(1,'blue');
                ctx.fillStyle = grad1;
                ctx.strokeStyle = grad1;    
                
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font ='49px Impact';                
                ctx.fillText(numHit,ctx.canvas.width/2,ctx.canvas.height/2); 
                
                ctx.fillRect(p.counter*10,(yArr[yArr.length-1]-1)*w,10,yArr.length*w);
                console.log( (yArr[yArr.length-1]-1)*w ,  (yArr[0]-1)*w )
                ctx.restore();
            },1);  
    }
    static blockEffect(tetrisInstance) {
        let rectArr = [],
            degree,now,interval = 0,
            x = 0,y = 0,
            styles = ['#ecc6d9','#ff0066','#99ff66','#999966','#993333','#cc99ff','#008080','#1aff8c','#669999','#808000'];

        for(let i of tetrisInstance.block.increaseX) {
            if( i > 0)
                x+=25;
        }

        for(let i of tetrisInstance.block.increaseY) {
            if( i > 0)
                y+=25;
        }

        x = x/2 + tetrisInstance.block.increaseX[0];  
        y += tetrisInstance.downCount;

        tetrisInstance.img = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);   

        for(let i=0; i<10; i++) 
            rectArr.push(new MiniRect(x,y));


        for(let i=0; i<10; i++) {
            ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
            ctx.putImageData(tetrisInstance.img,0,0);

            for(let j=0; j<10; j++) {
                rectArr[j].x += Math.cos(rectArr[j].degree) * (rectArr[j].width*1.5);
                rectArr[j].y += Math.sin(rectArr[j].degree) * (rectArr[j].height*1.5);


                
                interval += 10;
                ( (x,y,w,h,itv,style) => {
                    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                    ctx.putImageData(tetrisInstance.img,0,0);
                    setTimeout( () => {
                        ctx.fillStyle = style;
                        ctx.fillRect(x,y,w,h);
                    },itv);
                })(rectArr[j].x,rectArr[j].y,rectArr[j].width,rectArr[j].height,interval,styles[i]);   
                

                //ctx.fillRect(rectArr[j].x,rectArr[j].y,rectArr[j].width,rectArr[j].height);
            }

            /*
            console.log('qwe');
            interval+=10;
            ( (arr,itv) => {
                window.setTimeout( () => {
                    
                    for(let i=0; i<10; i++) {
                        ctx.fillRect(arr[i].x,arr[i].y,arr[i].width,arr[i].height);
                        console.log(itv);
                    }
                },itv);
            })(rectArr,interval);
            */

            
        }
    }
}

export default Animate;