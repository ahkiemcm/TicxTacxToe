// Setting up variables

var scoreTrack //Will be an array to keep track of what selection is in each box (X, O, null)
const PC = 'X'
const NPC = 'O'
const vCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizantal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6] //diagonal
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").getElementsByClassName.display = "none"
    //We grab the endgame modal once we reset the game and reset display to none.
    scoreTrack = Array.from(Array(9).keys());
    console.log(scoreTrack)
    //This creates an array of 9 elements. This is the score tracker
    for (let x = 0; x < cells.length; x++) {
        console.log('-X-')
        //Now we create a loop to perform actions on all the cells...
        cells[x].innerText = ''
        //...reset the boxes to nothing
        cells[x].style.removeProperty('background-color');
        //....reset the background color of each square (chosen squares will be highlighted upon victory)
        cells[x].addEventListener('click', turnClick, false)
        //.....add a click function called turnClick to each square
    }
}

function turnClick(square) {
    // console.log(square.target.id)
    turn(square.target.id, PC)
}

function turn(x, PC) {
    scoreTrack[x] = PC
    document.getElementById(x).innerText = PC
}