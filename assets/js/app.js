document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;
    const scoreD = document.getElementById('score')

    /* setting the various images */
const crushImgs = [
    'red',
    'yellow',
    'orange',
    'green',
    'blue',
    'purple'
]


 /* Creating the board */

function makeBoard () {
    for (let i = 0; i < width*width; i++) {
        const div = document.createElement('div');
        div.setAttribute('draggable', true);
        div.setAttribute('id', i);
        let randomImg = Math.floor(Math.random() * crushImgs.length);
        div.style.backgroundColor = crushImgs[randomImg];
        grid.appendChild(div);
        squares.push(div);
        
    }

}
makeBoard()

/* dragging images */
let imgBeingDragged;
let imgBeingReplaced;
let divIdbeingDragged;
let divIdbeingReplaced

squares.forEach(div => div.addEventListener('dragstart', dragStart));
squares.forEach(div => div.addEventListener('dragend', dragEnd));
squares.forEach(div => div.addEventListener('dragover', dragOver));
squares.forEach(div => div.addEventListener('dragleave', dragLeave));
squares.forEach(div => div.addEventListener('dragenter', dragEnter));
squares.forEach(div => div.addEventListener('drop', dragDrop));

function dragStart () {
 imgBeingDragged = this.style.backgroundColor;
 divIdbeingDragged = parseInt(this.id);
}


function dragOver (e) {
    e.preventDefault() 
}

function dragLeave () {
    
}

function dragEnter (e) {
    e.preventDefault() 
}

function dragDrop () {
    imgBeingReplaced = this.style.backgroundColor;
    divIdbeingReplaced = parseInt(this.id);
    this.style.backgroundColor = imgBeingDragged
    squares[divIdbeingDragged].style.backgroundColor = imgBeingReplaced
}

function dragEnd () {
    
/* Define valid moves */
let validMoves = [
    divIdbeingDragged -1, 
    divIdbeingDragged -width,
    divIdbeingDragged +1,
    divIdbeingDragged +width
]

let validMove = validMoves.includes(divIdbeingReplaced)

if (divIdbeingReplaced && validMove) {
    divIdbeingReplaced = null

} else if (divIdbeingReplaced && !validMove) {
   squares[divIdbeingReplaced].style.backgroundColor = imgBeingReplaced
   squares[divIdbeingDragged].style.backgroundColor = imgBeingDragged 
} else squares[divIdbeingDragged].style.backgroundColor = imgBeingDragged
}
let boardWidth = width*width
let boardLength = boardWidth;

/* add more rows */
function moveDown(){
    let firstRow = []
    for (let i = 0; i < width; i++) {
        firstRow.push(i);
    }

    for ( i = 0; i < boardWidth-width; i++) {
        if (squares[i + width].style.backgroundColor === ''){
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
            squares[i].style.backgroundColor = '';
            const isFirstRow = firstRow.includes(i);
            if (isFirstRow && squares[i].style.backgroundColor === ''){
                let randomImg = Math.floor(Math.random() * crushImgs.length);
                squares[i].style.backgroundColor = crushImgs[randomImg]
            }
        }
    }
}

/* match checking */

/* check for 4 */

function checkRowForFour(){
    let notValid = [];
    for (let t = 1; t < width; t++) {
        let a = (width*t) -1;
        let b = (width*t) -2;
        let c = (width*t) -3;
        notValid.push(a);
        notValid.push(b);
        notValid.push(c);
        
    } 
    for ( i = 0; i < boardWidth-2; i++) {
     let rowOfFour = [i, i+1, i+2, i+3]
     let decidedImg = squares[i].style.backgroundColor
     const isBlank =  squares[i].style.backgroundColor === ''
    if (notValid.includes(i)) continue
    
    if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedImg && !isBlank)) {
        score += 4
        scoreD.innerHTML = score 
        rowOfFour.forEach(index => {
            squares[index].style.backgroundColor = ''
        })
    }
}

}
function checkColumnForFour(){
    
    let fourWidth = (width*3)+1
    for ( i = 0; i < boardLength-fourWidth; i++) {
     let columnOfFour = [i, i+width, i+width*2, i+width*3]
     let decidedImg = squares[i].style.backgroundColor
     const isBlank =  squares[i].style.backgroundColor === ''
    //  if (notValid.includes(i)) continue

     if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedImg && !isBlank)) {
        score += 4
        scoreD.innerHTML = score
        columnOfFour.forEach(index => {
             squares[index].style.backgroundColor = ''
         })
     }
    }

}

/* check for 3 */

function checkRowForThree(){
    let notValid = [];
    for (let t = 1; t < width; t++) {
        let a = (width*t) -1;
        let b = (width*t) -2;
        notValid.push(a);
        notValid.push(b);
        
    } 
    for ( i = 0; i < boardWidth-2; i++) {
     let rowOfThree = [i, i+1, i+2]
     let decidedImg = squares[i].style.backgroundColor
     const isBlank =  squares[i].style.backgroundColor === ''
    if (notValid.includes(i)) continue
    
    if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedImg && !isBlank)) {
        score += 3
        scoreD.innerHTML = score 
        rowOfThree.forEach(index => {
            squares[index].style.backgroundColor = ''
        })
    }
}

}
function checkColumnForThree(){
    for ( i = 0; i < boardLength-(width*2 +1); i++) {
     let columnOfThree = [i, i+width, i+width*2]
     let decidedImg = squares[i].style.backgroundColor
     const isBlank =  squares[i].style.backgroundColor === ''
     
     if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedImg && !isBlank)) {
        score += 3
        scoreD.innerHTML = score 
        columnOfThree.forEach(index => {
             squares[index].style.backgroundColor = ''
         })
     }
    }

}


window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
}, 100)

})