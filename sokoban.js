let board, personaje, muro, caja, meta, levels, images, level=0;
let position, goalPosition, goalCompleted, goalNumber;
let title, mainSong, music=true, scenario=0;
let playButton, musicButtonOn, musicButtonOff, reStartButton;
let Lvl1, Lvl2, Lvl3, Lvl4, Lvl5, Lvl6, Lvl7, Lvl8, Lvl9, Lvl10
let imgLvls, solvedLevels=[];
let marginY, marginX, cellLength, origin=[], startMat=[];
let recargar = true


function preload(){
    caja = loadImage('Images/box1.png');
    caja2 = loadImage('Images/box2.png');
    felicidades = loadImage('Images/seleccion.png')
    gameScreen = loadImage('Images/gameScreen.png');
    grass = loadImage('Images/grass.png');
    grass2 = loadImage('Images/grass2.png');
    meta = loadImage('Images/goal.png');
    muro = loadImage('Images/block.png');
    nextScreen = loadImage('Images/nextScreen.png');    
    personaje = loadImage('Images/mcface4.png');
    secondScreen = loadImage('Images/secondScreen.png');
    title = loadImage('Images/title.png');
    titleScreen = loadImage('Images/titleScreen.png');  
    finalScreen = loadImage('Images/victoryScreen.png');  

    levels = loadJSON('level.json');

    soundFormats('mp3');
    mainSong = loadSound('Sound/mainLoop');
}

function setup() {
    createCanvas(1000, 700);

    playButton=createImg('Images/buttonPlay.png');
    playButton.position(185, 350);
    playButton.mousePressed(changeScreen);

    musicButtonOn=createImg('Images/musicOn.png'); 
    musicButtonOn.position(10, 10);                
    musicButtonOn.mousePressed(switchMusic);

    musicButtonOff=createImg('Images/musicOff.png');
    musicButtonOff.position(10, 10);                
    musicButtonOff.mousePressed(switchMusic);

    reStartButton=createImg('Images/reStart.png');
    reStartButton.position(130, 10);                 
    reStartButton.mousePressed(loadLevel);

    menuButton=createImg('Images/menu.png');
    menuButton.position(70, 10);                 
    menuButton.mousePressed(mainMenu);

    selectButton=createImg('Images/buttonSelect.png');
    selectButton.position(185, 350);                 
    selectButton.mousePressed(selectLevel);

    nextButton=createImg('Images/buttonNext.png');
    nextButton.position(185, 420);                 
    nextButton.mousePressed(nextLevel);

    Lvl1=createImg('Images/Lvl1.png');
    Lvl1.mousePressed(play_0);

    Lvl2=createImg('Images/Lvl2.png');
    Lvl2.mousePressed(play_1);
  
    Lvl3=createImg('Images/Lvl3.png');
    Lvl3.mousePressed(play_2);
  
    Lvl4=createImg('Images/Lvl4.png');
    Lvl4.mousePressed(play_3);
  
    Lvl5=createImg('Images/Lvl5.png');
    Lvl5.mousePressed(play_4);
  
    Lvl6=createImg('Images/Lvl6.png');
    Lvl6.mousePressed(play_5);
  
    Lvl7=createImg('Images/Lvl7.png');
    Lvl7.mousePressed(play_6);
  
    Lvl8=createImg('Images/Lvl8.png');
    Lvl8.mousePressed(play_7);
  
    Lvl9=createImg('Images/Lvl9.png');
    Lvl9.mousePressed(play_8);
  
    Lvl10=createImg('Images/Lvl10.png');
    Lvl10.mousePressed(play_9);
  
    //Botones de nivel primera fila
    Lvl1.position(110,200);
    Lvl2.position(270,200);
    Lvl3.position(430,200);
    Lvl4.position(590,200);
    Lvl5.position(750,200);
    
    //Botones de nivel primera fila
    Lvl6.position(110,350);
    Lvl7.position(270,350);
    Lvl8.position(430,350);
    Lvl9.position(590,350);
    Lvl10.position(750,350);

    imgLvls=[Lvl1,Lvl2,Lvl3,Lvl4,Lvl5,Lvl6,Lvl7,Lvl8,Lvl9,Lvl10];

    musicButtonOn.hide()
    reStartButton.hide()

    board=createQuadrille(10, 10);
    
    images = {"personaje": personaje, 
    "muro": muro, "caja": caja, "meta": meta}

    marginX=50;
    marginY=50;
    cellLength=50;
    loadLevel();
}

function draw() {
    switch (scenario){
        case 0:{
            image(titleScreen,-200,-200)
            image(title,150,100)
            playButton.show();              
            reStartButton.hide()
            menuButton.hide()
            selectButton.hide()
            nextButton.hide()
            for(var lvl of imgLvls){
                lvl.hide();
            }
        }break;
        
        case 1:{
            playButton.hide()
            menuButton.show()       
            reStartButton.show()
            selectButton.hide()
            nextButton.hide()
            for(var lvl of imgLvls){
                lvl.hide();
            }
            image(gameScreen,-200,-200)    
            drawQuadrille(board, {cellLength: cellLength, board: false, pixelX: origin[0], pixelY: origin[1], outline: (60,60,60), outlineWeight: 1});
            drawAndVerify();
            if(recargar){
                loadLevel()
                recargar=!recargar
            }
        }break;

        case 2:{
            reStartButton.hide()
            menuButton.show()
            selectButton.show()
            nextButton.show()
            image(nextScreen,-200,-200)      
            image(felicidades,150,100)

        }break;

        case 3:{
            reStartButton.hide()
            menuButton.show()
            selectButton.hide()
            nextButton.hide()
            background(0);
            fill(255);
            textSize(50);
            image(finalScreen,-200,-200)
            for(var lvl of imgLvls){
                lvl.hide();
              }
            
        }break; //no tenia el break xd

        case 4:{
            playButton.hide();
            reStartButton.hide()
            menuButton.show()
            selectButton.hide()
            nextButton.hide()
            image(secondScreen,-200,-200)
            if(solvedLevels.length>0){
              for (var l of solvedLevels){
                noFill()
                stroke(255, 204, 0);
                strokeWeight(5);
                square(l<5? 110 + l*160 : 110 + (l-5)*160, l<5? 200 : 350 , 120)
              }
            }
            for(var lvl of imgLvls){
              lvl.show();
            }       
       }break;
    }
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        move('+c');
    }
    if (keyCode == LEFT_ARROW) {
        move('-c');
    }
    if (keyCode == DOWN_ARROW) {
        move('+r');
    }
    if (keyCode == UP_ARROW) {
        move('-r');
    }
}

function loadLevel(actualLevel = levels[level]) {
    board=createQuadrille(3,3);

    for (let i = 0; i < 4; i++){
        var element = images[actualLevel[i].element];
        for (let j = 0; j < actualLevel[i].position.length; j += 2){
            var r=actualLevel[i].position[j];
            var c=actualLevel[i].position[j + 1];
            
            if(r+1>board.height){
                board.height=r+1;
            }
            if(c+1>board.width){
                board.width=c+1;
            }
            
            board.fill(r,c,element);
            
            if (element === personaje) {
                position = actualLevel[i].position
            }
            else if (element === meta) {
                goalPosition = actualLevel[i].position;
                goalNumber = goalPosition.length / 2;
            }
        }
        
        setSize();
        setOrigin();
    }
    startMat=[]
    for(let i = 0; i<board.height ; i++){
        startMat.push([])
        for(let j = 0; j<board.width ; j++){
            startMat[i].push(Math.round(random(0,1)))
        }
    }

}

function drawAndVerify() {
    goalCompleted = 0;
    for (let g = 0; g < goalPosition.length; g += 2) {
        if (board.read(goalPosition[g], goalPosition[g + 1]) === 0) {
            board.fill(goalPosition[g], goalPosition[g + 1], meta);
        }
        else if (board.read(goalPosition[g], goalPosition[g + 1]) === caja2) {
            goalCompleted += 1;
        }
    }
    if (goalCompleted === goalNumber) {

        if(!solvedLevels.includes(level)){
            solvedLevels.push(level);
        }
        if (level < 9) {
            level += 1;
            scenario=2;
        }
        else {
            scenario=3;
        }
    }

    for(let i = 0; i<board.height ; i++){
        for(let j = 0; j<board.width ; j++){
            if(board.read(i,j) === 0){
                if(startMat[i][j]==0){
                    board.fill(i,j,grass) 
                }
                else if (startMat[i][j]==1){
                    board.fill(i,j,grass2) 
                }
            }
        }
    }
}

function findPosition(change, actualPosition = position) {
    var newPosition;
    var nextPosition;   
    if (change == '-c') {
        newPosition = [actualPosition[0], actualPosition[1] - 1];
        nextPosition = [actualPosition[0], actualPosition[1] - 2];
    }
    else if (change == '+c') {
        newPosition = [actualPosition[0], actualPosition[1] + 1];
        nextPosition = [actualPosition[0], actualPosition[1] + 2];
    }
    else if (change == '-r') {
        newPosition = [actualPosition[0] - 1, actualPosition[1]];
        nextPosition = [actualPosition[0] - 2, actualPosition[1]];
    }
    else if (change == '+r') {
        newPosition = [actualPosition[0] + 1, actualPosition[1]];
        nextPosition = [actualPosition[0] + 2, actualPosition[1]];
    }
    return [newPosition, nextPosition]
}

function step(actual, New, image = personaje) {
    board.clear(actual[0], actual[1]);
    board.fill(New[0], New[1], image);
    if (image === personaje) {
        position = New;
    }
}

function move(change) {
    var p = findPosition(change);//p=[newPosition,nextPosition]

    if (board.read(p[0][0], p[0][1]) === grass2 || board.read(p[0][0], p[0][1]) === grass || board.read(p[0][0], p[0][1]) === meta) {
        step(position, p[0]);
    }
    else if ((board.read(p[0][0], p[0][1]) === caja || board.read(p[0][0], p[0][1]) === caja2) && (board.read(p[1][0], p[1][1]) === grass2 || board.read(p[1][0], p[1][1]) === grass || board.read(p[1][0], p[1][1]) === meta)) {
        step(p[0], p[1], board.read(p[1][0], p[1][1]) == meta ? caja2 : caja);
        step(position, p[0]);
    }
}

function changeScreen(){
    loadLevel();
    scenario=4;
}

function mainMenu(){
    scenario=0;
}

function switchMusic(){
    if(music){
        mainSong.play();
        mainSong.loop();
        music=!music
        musicButtonOn.show()
        musicButtonOff.hide()
    } else if(!music){
        mainSong.stop();
        music=!music
        musicButtonOn.hide()
        musicButtonOff.show()
    }
}


function setSize(){
    cellLength=60;
    if (board.height*cellLength>height-2*marginY){
      cellLength=(height-2*marginY)/board.height;
    }
    if(board.width*cellLength>height-2*marginY){
      cellLength=(width-2*marginY)/board.width;
    }
  }
  
function setOrigin(){
    origin[0]=(width-(board.width*cellLength))/2;
    origin[1]=(height-(board.height*cellLength))/2;
}

function nextLevel(){
    loadLevel();
    scenario=1
}

function selectLevel(){
    scenario=4
}

let play_0 = () => {level=0, loadLevel(), scenario=1}
let play_1 = () => {level=1, loadLevel(), scenario=1}
let play_2 = () => {level=2, loadLevel(), scenario=1}
let play_3 = () => {level=3, loadLevel(), scenario=1}
let play_4 = () => {level=4, loadLevel(), scenario=1}
let play_5 = () => {level=5, loadLevel(), scenario=1}
let play_6 = () => {level=6, loadLevel(), scenario=1}
let play_7 = () => {level=7, loadLevel(), scenario=1}
let play_8 = () => {level=8, loadLevel(), scenario=1}
let play_9 = () => {level=9, loadLevel(), scenario=1}