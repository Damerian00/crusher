document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];

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

function dragEnd () {
    
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
    squares[divIdbeingDragged].style.backgroundColor = imgBeingReplaced
}



})