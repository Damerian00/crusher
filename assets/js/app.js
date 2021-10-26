document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;
    const scoreD = document.getElementById('score')

    /* setting the various images */
const crushImgs = [
    'url(./assets/images/desert.png)',
    'url(./assets/images/fishyGuy.png)',
    'url(./assets/images/greenStick.png)',
    'url(./assets/images/gunner.png)',
    'url(./assets/images/hunter.png)',
    'url(./assets/images/redcaveStick.png)'
]


 /* Creating the board */

function makeBoard () {
    for (let i = 0; i < width*width; i++) {
        const div = document.createElement('div');
        div.setAttribute('draggable', true);
        div.setAttribute('id', i);
        let randomImg = Math.floor(Math.random() * crushImgs.length);
        div.style.backgroundImage = crushImgs[randomImg];
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
 imgBeingDragged = this.style.backgroundImage;
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
    imgBeingReplaced = this.style.backgroundImage;
    divIdbeingReplaced = parseInt(this.id);
    this.style.backgroundImage = imgBeingDragged
    squares[divIdbeingDragged].style.backgroundImage = imgBeingReplaced
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
   squares[divIdbeingReplaced].style.backgroundImage = imgBeingReplaced
   squares[divIdbeingDragged].style.backgroundImage = imgBeingDragged 
} else squares[divIdbeingDragged].style.backgroundImage = imgBeingDragged
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
        if (squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = '';
            const isFirstRow = firstRow.includes(i);
            if (isFirstRow && (squares[i].style.backgroundImage === '')){
                let randomImg = Math.floor(Math.random() * crushImgs.length);
                squares[i].style.backgroundImage = crushImgs[randomImg]
            }
        }
    }
}

/* match checking */

/* check for 5 */

function checkRowForFive(){
    let notValid = [];
    for (let t = 1; t < width; t++) {
        let a = (width*t) -1;
        let b = (width*t) -2;
        let c = (width*t) -3;
        let d = (width*t) -4;
        notValid.push(a);
        notValid.push(b);
        notValid.push(c);
        notValid.push(d);
        
    } 
    for ( i = 0; i < boardWidth-2; i++) {
     let rowOfFive = [i, i+1, i+2, i+3]
     let decidedImg = squares[i].style.backgroundImage
     const isBlank =  squares[i].style.backgroundImage === ''
    if (notValid.includes(i)) continue
    
    if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedImg && !isBlank)) {
        score += 5
        scoreD.innerHTML = score 
        rowOfFive.forEach(index => {
            squares[index].style.backgroundImage = ''
        })
    }
}

}
function checkColumnForFive(){
    
    let fiveWidth = (width*4)+1
    for ( i = 0; i < boardLength-fiveWidth; i++) {
     let columnOfFive = [i, i+width, i+width*2, i+width*3]
     let decidedImg = squares[i].style.backgroundImage
     const isBlank =  squares[i].style.backgroundImage === ''

     if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedImg && !isBlank)) {
        score += 5
        scoreD.innerHTML = score
        columnOfFive.forEach(index => {
             squares[index].style.backgroundImage = ''
         })
     }
    }

}


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
     let decidedImg = squares[i].style.backgroundImage
     const isBlank =  squares[i].style.backgroundImage === ''
    if (notValid.includes(i)) continue
    
    if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedImg && !isBlank)) {
        score += 4
        scoreD.innerHTML = score 
        rowOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
        })
    }
}

}
function checkColumnForFour(){
    
    let fourWidth = (width*3)+1
    for ( i = 0; i < boardLength-fourWidth; i++) {
     let columnOfFour = [i, i+width, i+width*2, i+width*3]
     let decidedImg = squares[i].style.backgroundImage
     const isBlank =  squares[i].style.backgroundImage === ''

     if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedImg && !isBlank)) {
        score += 4
        scoreD.innerHTML = score
        columnOfFour.forEach(index => {
             squares[index].style.backgroundImage = ''
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
     let decidedImg = squares[i].style.backgroundImage
     const isBlank =  squares[i].style.backgroundImage === ''
    if (notValid.includes(i)) continue
    
    if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedImg && !isBlank)) {
        score += 3
        scoreD.innerHTML = score 
        rowOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
        })
    }
}

}
function checkColumnForThree(){
    for ( i = 0; i < boardLength-(width*2 +1); i++) {
     let columnOfThree = [i, i+width, i+width*2]
     let decidedImg = squares[i].style.backgroundImage
     const isBlank =  squares[i].style.backgroundImage === ''
     
     if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedImg && !isBlank)) {
        score += 3
        scoreD.innerHTML = score 
        columnOfThree.forEach(index => {
             squares[index].style.backgroundImage = ''
         })
     }
    }

}


window.setInterval(function(){
    moveDown()
    checkRowForFive()
    checkColumnForFive()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    
}, 100)

})