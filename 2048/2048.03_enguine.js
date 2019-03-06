Array.prototype.daiMiRandom = function () {
    return this[Math.floor(Math.random() * this.length)];
}
const STARTING_VALUE = 2;
const COLORS = new Map();
COLORS.set(2,'rgb(238,228,218)').set(4,"rgb(234,224,200)").set(8,"rgb(242,177,121)").set(16,"rgb(245,149,99)")
.set(32,"rgb(246,124,95)").set(64,"rgb(246,94,59)").set(128,"rgb(247,80,50)").set(256,"rgb(248,65,40)").set(512,"rgb(249,50,30)").set(1024,"rgb(250,35,20)").set(2048, "rgb(255,0,0)");
function copyingResault(array){
    for (let row = 0; row < array.length; row++) {
        playGround.shift();
        var newRow = [];
        for (let col = 0; col < array.length; col++){
            newRow.push(array[row][col]);
        }
        playGround.push(newRow);
        newRow = [];
    }
}

function showMyBorad(array) {
    array.forEach(row => console.log(row));
}
function rotate(array) {
    let rotatedArray = [];
    for (let col = 0; col < array.length;col++) {
        var newRow = [];
        for (row = 0; row < array.length; row++) {
            newRow.unshift(array[row][col]);
        }
        rotatedArray.push(newRow);
        newRow = [];
    }
    return rotatedArray;
 };

 function deRotate (array) {
    let rotatedArray = [];
   for (let col = 0; col < array.length;col++) {
       var newRow = [];
       for (row = 0; row < array.length; row++) {
           newRow.push(array[row][col]);
       }
       rotatedArray.unshift(newRow);
       newRow = [];
   }
   return rotatedArray;
}

function createMyBoard() {
    const ROW_COLMN = 4;
    var newPlayGround = new Array(ROW_COLMN);
    for (let row = 0; row < newPlayGround.length; row++) {
        newPlayGround[row] = new Array(ROW_COLMN);
        for (let col = 0; col < newPlayGround[row].length; col++) {
            newPlayGround[row][col] = 0;
        }
    };
    for (let choice = 1; choice <= STARTING_VALUE; choice++) {
        // var row = Math.floor(Math.random() * 4);
        // var col = Math.floor(Math.random() * 4);
        // console.log(row, col)
        // if (!playGround[row][col]) {
        //     playGround[row][col] = STARTING_VALUE;
        // }
        controler(newPlayGround);
    }
    return playGround;




}

function newGame(){
    playGround = createMyBoard();
    console.log('newgame')
}

var playGround = createMyBoard();
// var playGround = [
//     [0, 0, 4, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 2],
//     [0, 4, 4, 4]
// ]

function moveUP(array){
    ///presmqtane
    for (let row = 0; row<array.length -1; row++) {
        for (let col = 0; col < array.length; col++) {
            if (array[row][col] === array[row+1][col] && array[row][col] !==0){
                array[row][col] = array[row][col] * 2;
                array[row+1][col] = 0;
            }
        }
        
    }
    var podgotven = rotate(array)
    // showMyBorad(array)
    .map(row =>{
        var rowWitoutZeros = row.filter(el => el!==0);
        if (!rowWitoutZeros.length){
            return [0,0,0,0];
        }
        while (rowWitoutZeros.length < 4) {
            rowWitoutZeros.unshift(0);
        }
        return rowWitoutZeros
    });
    
    controler(deRotate(podgotven))
}

function moveDown(array){
    // presmqtane
    for (let row = 0; row < array.length -1; row++) {
        for (let col = 0; col < array.length; col++) {
            if (array[row][col] === array[row+1][col] && array[row][col] !==0){
                array[row+1][col] = array[row][col] * 2;
                array[row][col] = 0;
            }
        }  
    }
    ///Premestvane
    
    var podgotven = rotate(array)
        .map(row =>{
        var rowWitoutZeros = row.filter(el => el!==0);
        if (!rowWitoutZeros.length){
            return [0,0,0,0];
        }
        
        while (rowWitoutZeros.length < 4) {
            rowWitoutZeros.push(0);
        }
        return rowWitoutZeros
    });

    controler(deRotate(podgotven))
    
}
function moveRight(array){
    // presmqtane
    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array.length-1; col++) {
            if (array[row][col] === array[row][col+1] && array[row][col] !==0){
                array[row][col+1] = array[row][col] * 2;
                array[row][col] = 0;
            }
        }  
    }
    ///Premestvane
    
    var podgotven = array
        .map(row =>{
        var rowWitoutZeros = row.filter(el => el!==0);
        if (!rowWitoutZeros.length){
            return [0,0,0,0];
        }
        
        while (rowWitoutZeros.length < 4) {
            rowWitoutZeros.unshift(0);
        }
        return rowWitoutZeros
    });


    controler(podgotven)
}

function moveLeft(array){
    // presmqtane
    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array.length-1; col++) {
            if (array[row][col] === array[row][col+1] && array[row][col] !==0){
                array[row][col] = array[row][col+1] * 2;
                array[row][col+1] = 0;
            }
        }  
    }
    ///Premestvane
    
    var podgotven = array
        .map(row =>{
        var rowWitoutZeros = row.filter(el => el!==0);
        if (!rowWitoutZeros.length){
            return [0,0,0,0];
        }
        
        while (rowWitoutZeros.length < 4) {
            rowWitoutZeros.push(0);
        }
        return rowWitoutZeros
    });
    controler(podgotven)
}
function controler (array) {
    if (array.some(row => row.some(col =>col === 2048))){
        drwaHTML("win")
        return
    }
    
    var emptySpaces = [];
    array.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (!array[rowIndex][colIndex]){
                emptySpaces.push(rowIndex,colIndex);
            }
        })
    });
    // slagam na proizvolna poziciq cifra
    if (emptySpaces.length > 2){
        console.log(emptySpaces.length)
        do {
            var newRowIndex = Math.floor(Math.random() * emptySpaces.length);
        } while ((newRowIndex&1) === 1 || !newRowIndex);
        var newRow = emptySpaces[newRowIndex];
        var newCol = emptySpaces[newRowIndex + 1]
        array[newRow][newCol] = STARTING_VALUE;

        if (!playGround){
            playGround = array.slice();
        } else {
            copyingResault(array);
        }
        

        drwaHTML(playGround);
    } else {
        drwaHTML('gameover')
    }

}

function drwaHTML(array) {
    var container = document.querySelector("#container");
    container.innerHTML ='';
    if (Array.isArray(array)){
        array.forEach(row => row.forEach(col => {
        col = col || '';
        var textSize = (col > 64) ? "45px" : "55px";
        var textCol = (col > 4) ? "rgb(255,255,255)" : "#776e65;"
        var background = COLORS.get(col) || "rgb(205,193,180)"
        container.innerHTML += 
        `<div style="background: ${background}">
        <h1 style="color: ${textCol}; font-size: ${textSize}">${col}</h1>
        </div>`
        }))
    }
    if (array === 'gameover'){
        container.innerHTML = 
        `<div id="dead">
        <h1>GAMEOVER</h1>
        <button onclick="newGame()">new GAME</button>
        </div>`
    }
    if (array === 'win'){
        container.innerHTML = 
        `<div id="win">
        <h1>YOU WIN!!!</h1>
        <button onclick="newGame()">new GAME</button>
        </div>`
    } 
    
}

const KEY_BOARD_CODES = new Map()
KEY_BOARD_CODES.set(38,moveUP.bind(window,playGround)).set(40,moveDown.bind(window,playGround))
.set(37,moveLeft.bind(window,playGround)).set(39,moveRight.bind(window,playGround));

// var lastComand = 0;

document.body.addEventListener('keyup',event =>{
    // var newCommand = event.keyCode;
    // if (lastComand !== newCommand && KEY_BOARD_CODES.has(newCommand)) {
    //     var command = KEY_BOARD_CODES.get(event.keyCode);
    //     command();
    //     lastComand = event.keyCode;
    // }
    if(KEY_BOARD_CODES.has(event.keyCode)){
        var command = KEY_BOARD_CODES.get(event.keyCode);
        command();
    }  
}, false)
