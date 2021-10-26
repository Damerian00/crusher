document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;

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

/* match checking */
let boardWidth = width*width
let boardLength = boardWidth;

function checkRowForThree(){
    let notValid = [];
    for (let t = 1; t < width; t++) {
        let a = (width*t) -1;
        let b = (width*t) -2;
        notValid.push(a);
        notValid.push(b);
        
    } 
    console.log(notValid);
    for ( i = 0; i < boardWidth-2; i++) {
     let rowOfThree = [i, i+1, i+2]
     let decidedImg = squares[i].style.backgroundColor
     const isBlank =  squares[i].style.backgroundColor === ''
    //  const notValid = [width, width -1, ];
    if (notValid.includes(i)) continue
    
    if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedImg && !isBlank)) {
        score += 3 
        rowOfThree.forEach(index => {
            squares[index].style.backgroundColor = ''
        })
    }
}

}

function checkColumnForThree(){
    for ( i = 0; i < boardLength-(width*2); i++) {
     let columnOfThree = [i, i+width, i+width*2]
     let decidedImg = squares[i].style.backgroundColor
     const isBlank =  squares[i].style.backgroundColor === ''
     
     if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedImg && !isBlank)) {
        score += 3 
        columnOfThree.forEach(index => {
             squares[index].style.backgroundColor = ''
         })
     }
    }

}

window.setInterval(function(){
    checkRowForThree()
    checkColumnForThree()
}, 100)

})