let inputDir={x:0,y:0};
const foodSound=new Audio('./music/food.mp3');
const gameOverSound=new Audio('./music/gameover.mp3');
const moveSound=new Audio('./music/move.mp3');
const musicSound=new Audio('./music/Romeo.mp3');
let speed=4;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7};
let score=0;
// function setSpeed(score){
//     if(score>10){
//         speed=6;
//     }else if(score>20){
//         speed=8;
//     }else if(score>30){
//         speed=10;
//     }else if(score>40){
//         speed=12;
//     }else if(score>50){
//         speed=14;
//     }else if(score>60){
//         speed=16;
//     }else if(score>100){
//         speed=18;
//     }
// }
function main(ctime){
    
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isColide(snake){
    //if snake collide itself
    for(let i=1; i< snake.length; i++){
        if(snake[i].x=== snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x >18 || snake[0].x <=0 || snake[0].y >18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
    //update the snake and food 
    if(isColide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert('Game Over, Press any key to play again.')
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    //snake eat the food then increment the food and score
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=2;
        if(score>15){
            speed=7;
        }else if(score>30){
            speed=10;
        }else if(score>45){
            speed=13;
        }else if(score>60){
            speed=17;
        }else if(score>75){
            speed=22;
        }else if(score>90){
            speed=26;
        }else if(score>110){
            speed=30;
        }else if(score>125){
            speed=35;
        }
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="High score: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+ score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)* Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display the snake and food
    board.innerHTML="";
    //display the snake
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//main logic starts hear-----
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="High score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //start the game
    moveSound.play();
    musicSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLert");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});