let inputDir = {x:0,y:0};
let playMusic = false ;
const music1 = new Audio("Baby-Calm-Down(PaglaSongs).mp3");
const music2 = new Audio("Yugat-Mandali(PaglaSongs).mp3");
const gameOverMusic = new Audio("mixkit-arcade-space-shooter-dead-notification-272.wav");
const foodMusic = new Audio("Human Eat Apple 3 - QuickSounds.com.mp3");
const keydownMusic = new Audio("click-button-140881.mp3");
let speed=2;
let lastpaintTime=0;
let score = 0;
let hiscore = 0;
let snakeArr =[
    {x:13,y:15}
]
 if(playMusic){
    music1.play();
 }

const btn = document.getElementById('btn');
btn.addEventListener('click' , ()=>{
   
        if(playMusic){
            playMusic = false;
            btn.innerHTML = "Sound Play";
            music1.pause();
        }
        else{
            playMusic = true ;
            btn.innerHTML = "Sound Pause" ;
            music1.play();
        }
    
})
 
food = {x: 3,y:2};
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime=ctime;

    // Score and Hiscore 
    const Score = document.getElementById('Score');
    Score.innerHTML = "Score : " + score.toString();
    if(hiscore < score){
        hiscore = score ;
        const hiScore = document.getElementById('hiScore');
        hiScore.innerHTML = "HighScore : " + hiscore.toString();
    }
    gameEngine();
}

function isCollide(sarr){
   if(snakeArr[0].x >18 || snakeArr[0].x <0 || snakeArr[0].y >18 || snakeArr[0].y <0 ){
    return true;
   }

   for(let i=1 ; i<snakeArr.length ; i++){
    if((snakeArr[i].x === snakeArr[0].x) && (snakeArr[i].y === snakeArr[0].y)){
      return true;
    }
   }
   return false;
}

function gameEngine(){
    // Collision and when you eat food
    if(isCollide(snakeArr)){
        gameOverMusic.play();
        music1.pause();
        inputDir = {x:0,y:0};
        snakeArr = [{x:13 , y:15}];
        score = 0;
        btn.innerHTML = "Sound Play";
    }

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y ){
        foodMusic.play();
        score += 1;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y })
        let a=2;
        let b=16;
        food = { x: Math.round( a+(b-a)*Math.random()),y: Math.round( a+(b-a)*Math.random())}
       
    }
    //move the snake
    for(let i= snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2:- Display food
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index ===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
    
        board.appendChild(snakeElement);

    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement);

   

   

}

// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    if(playMusic){
        music1.play();
        btn.innerHTML = "Sound Pause";
    }
    inputDir = {x:0, y:1};
    keydownMusic.play();
     switch (e.key) {
        case "ArrowUp":
            inputDir.x =0 ;
            inputDir.y = -1;
            break;
        case "ArrowDown" :
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft" :
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            console.log("Inavalid Input");
            break;
     }
})