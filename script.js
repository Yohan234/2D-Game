
var runStart =0;
function keycheck(event) {

    if (event.which == 13) {
        
        
        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runSound.play();
            runStart = 1;
              
            backgroundWorkerId = setInterval(movebackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlocks, 100);
        }


    }

    if (event.which == 32) {
        if(runStart == 1){

            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                
                runWorkerId = -1;
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();
                
            }

        }
        

    }
}


var player=document.getElementById("player");
var runImageNumber =1;
var runWorkerId =0;

var runSound = new Audio("run.mp3");
runSound.loop = true;

function run(){
    runImageNumber++;
    if(runImageNumber==9){
        runImageNumber=1;
    }
    

    player.src = "Run ("+ runImageNumber + ").png";
    
}
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMargiTop = 502;

var jumpSound = new Audio("jump.mp3");
function jump() {
    jumpImageNumber++;
    if (jumpImageNumber <= 7) {
        playerMargiTop = playerMargiTop - 30;
        player.style.marginTop = playerMargiTop + "px";
    }
    if (jumpImageNumber >= 8) {
        playerMargiTop = playerMargiTop + 30;
        player.style.marginTop = playerMargiTop + "px";
    }
    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    player.src = "Jump (" + jumpImageNumber + ").png";
}

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function movebackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";

}
var scoreWorkerId = 0;
var score = document.getElementById("score");
var newScore = 0;
function updateScore() {
    newScore = newScore + 5;
    score.innerHTML = newScore;

}
var createBlockWorkerId = 0;
var playerMarginLeft = 600;
var blockId = 1;
function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    playerMarginLeft = playerMarginLeft + gap;
    block.style.marginLeft = playerMarginLeft + "px"
    background.appendChild(block);
}
var moveBlockWorkerId = 0;
function moveBlocks() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMrginLeft = currentBlock.style.marginLeft;
        var marginLeft = parseInt(currentMrginLeft) - 20;
        currentBlock.style.marginLeft = marginLeft + "px";
        



        //147 , 67
        if (marginLeft <= 147) {
            if (marginLeft >= 67) {
                if (playerMargiTop <= 502) {
                    if (playerMargiTop >= 426) {
                        clearInterval(runWorkerId);
                        runSound.pause();
                        
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = 1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockWorkerId);
                        clearInterval(moveBlockWorkerId);
                        deadWorkerId = setInterval(dead,100);
                        deadSound.play();
                        
                    }

                }
            }
        }
    }
}

var deadImageNumber = 1;
var deadWorkerId = 0;

var deadSound = new Audio("dead.mp3");
function dead() {
    deadImageNumber++;
    if(deadImageNumber==11){
        deadImageNumber = 10;
        player.style.marginTop = "502px";
        document.getElementById("gameover").style.visibility="visible";
        document.getElementById("endScore").innerHTML = newScore;
    }
    player.src = "Dead ("+ deadImageNumber +").png";

}

function restart(){
    location.reload();

}
