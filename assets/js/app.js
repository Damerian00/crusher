document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width;
    const squares = [];
    let score = 0;
    const scoreD = document.getElementById('score');
    const startBtn = document.getElementById('startBtn');
    let timerId;
    const scoreBd = document.querySelector('.scoreBoard');
    const timeBd = document.querySelector('.timerBoard');
    const tblWidth = document.getElementById('width');
    const diff = document.getElementById('diff')
    let boardWidth;
    let boardLength;
    const selection = document.querySelector('.selection');
    
    /* setting the various images */
const crushImgs = [
    'url(./assets/images/desert.png)',
    'url(./assets/images/fishyGuy.png)',
    'url(./assets/images/greenStick.png)',
    'url(./assets/images/gunner.png)',
    'url(./assets/images/hunter.png)',
    'url(./assets/images/redcaveStick.png)'
]

/* take in selection */
startBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    
    selection.style.opacity = 0;
    selection.addEventListener('transitionend', () => {
        selection.remove()
        init()
    
    });
});

function init() {
    let t;
   if (tblWidth.value === "8"){
       width = 8;

   } else if (tblWidth.value === "10"){
      width = 10;
   } else {
       width = 12
   }
  if (diff.value === "3"){
       t = 60;

   } else if (diff.value === "2"){
       t = 45;
   } else {
    //    t = 30;
        t = 3;
   }
  

   let newWidth = width*70;
   document.querySelector('.grid-container').style.width = newWidth + "px";
   grid.style.width = newWidth + "px";
   grid.style.height = newWidth + "px";
   countDown(t);
   makeBoard();
}

/* setUp countDownTimer */
function countDown(t) {
    timerId = t;
    let timerEl = document.getElementById('timer');
    let timeInterval = setInterval(function () {
        if (timerId <= 10){
            timerEl.style.color = "red";
        }
      if (timerId >= 1) {
        timerEl.textContent = timerId + ' seconds remaining';
        timerId--;
      } else {
        
        timerEl.textContent = 'Game Over';
        clearInterval(timeInterval);
        GameOver();
      }
    }, 1000);
  }

 /* Creating the board */

function makeBoard () {
    boardWidth = width*width
    for (let i = 0; i < width*width; i++) {
        const div = document.createElement('div');
        div.setAttribute('draggable', true);
        div.setAttribute('id', i);
        let randomImg = Math.floor(Math.random() * crushImgs.length);
        div.style.backgroundImage = crushImgs[randomImg];
        grid.appendChild(div);
        squares.push(div);
        
    }
    squares.forEach(div => div.addEventListener('dragstart', dragStart));
    squares.forEach(div => div.addEventListener('dragend', dragEnd));
    squares.forEach(div => div.addEventListener('dragover', dragOver));
    squares.forEach(div => div.addEventListener('dragleave', dragLeave));
    squares.forEach(div => div.addEventListener('dragenter', dragEnter));
    squares.forEach(div => div.addEventListener('drop', dragDrop));
    scoreBd.style.opacity = 1;
    timeBd.style.opacity = 1;
    
}


/* dragging images */
let imgBeingDragged;
let imgBeingReplaced;
let divIdbeingDragged;
let divIdbeingReplaced



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


/* add more rows */
function moveDown(){
  let firstRow = []
    for (let i = 0; i < width; i++) {
        firstRow.push(i);
    }
    for ( i = 0; i < boardWidth-width; i++) {
        if (squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = '';
        }
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && (squares[i].style.backgroundImage === '')){
            let randomImg = Math.floor(Math.random() * crushImgs.length);
            squares[i].style.backgroundImage = crushImgs[randomImg]
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
    boardLength = boardWidth;
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
    boardLength = boardWidth;
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
    boardLength = boardWidth;
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


window.setInterval(() =>{
if (timerId > 0){
    moveDown()
    checkRowForFive()
    checkColumnForFive()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
}
}, 100)

function GameOver () {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    grid.style.backgroundImage = "url(./assets/images/spaceBg.jpg)";
    grid.style.backgroundRepeat = "no-repeat";
    grid.style.backgroundSize = "cover";
    let h1 = document.createElement('h1');
    h1.setAttribute('class', 'gameOver');
    h1.innerHTML = `Game Over you scored: ${score} points. Would you like to play again?`;
    grid.appendChild(h1);
    btn = document.createElement('button');
    btn.setAttribute('id' , 'newGame');
    btn.innerHTML = "Start over"
    grid.appendChild(btn);

    btn.addEventListener('click' , ()=> {location.reload()}) 
}

})