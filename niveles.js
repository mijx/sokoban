let  rows=15, cols=15
let tamaño=30;
let mat=[]
let numbers=[]

function preload(){
    caja = loadImage('Images/box1.png');
}

function setup() {
    createCanvas(1000, 700);
    board=createQuadrille(cols, rows);
    for(let i = 0; i<cols ; i++){
        mat.push([])
        for(let j = 0; j<rows ; j++){
            mat[i].push(0)
        }
    }
}

function draw() {
    background(color('white'));
    drawQuadrille(board, {cellLength: tamaño, board: true, pixelX: 0, pixelY: 0, outline: (60,60,60), outlineWeight: 1});
}    

function keyPressed(){
    if(keyCode==ENTER){
        for(let i = 0; i<cols ; i++){
            for(let j = 0; j<rows ; j++){
                if(board.read(i, j)==caja){
                    numbers.push(i,j)
                }
            }
        }
        console.log(numbers)
    }
}

function mouseClicked(){
    mx1=floor(mouseX/tamaño)
    my1=floor(mouseY/tamaño)

    console.log(my1,mx1)

    board.fill(my1,mx1,caja)
    mat[mx1][my1]=8
    console.log(board.read(my1, mx1)==caja)
}